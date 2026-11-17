#!/usr/bin/env node
// Measures a rendered page for the tells in references/anti-slop.md and the hard failures in references/review-gate.md.
// Usage: node check-slop.mjs <url> [--out <dir>] [--widths 1440,768,390] [--allow marquee,bento]
// --allow names tells whose content reason DESIGN.md records; keys: marquee outlined sticker grain cursor bento
// glass-nav wordmark labels mono font.
// Needs Playwright: npm i -D playwright && npx playwright install chromium (found from the current directory or this
// script's). Elsewhere, PLAYWRIGHT_MODULE names the module file and CHROMIUM_PATH the browser to launch.
import { mkdir, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"
import { pathToFileURL } from "node:url"

const args = process.argv.slice(2)
const url = args.find((a) => !a.startsWith("--"))
const flag = (name, fallback) => {
	const i = args.indexOf(`--${name}`)
	return i === -1 ? fallback : args[i + 1]
}
if (!url) {
	console.error("usage: node check-slop.mjs <url> [--out <dir>] [--widths 1440,768,390] [--allow marquee,bento]")
	process.exit(2)
}
const out = flag("out", "slop-check")
const widths = flag("widths", "1440,768,390").split(",").map(Number)
const allowed = flag("allow", "").split(",").filter(Boolean)

// Node resolves a bare import from this script's folder, so the project's own node_modules is tried explicitly.
async function loadChromium() {
	const fromProject = createRequire(path.join(process.cwd(), "noop.js"))
	const candidates = [process.env.PLAYWRIGHT_MODULE]
	for (const name of ["playwright", "playwright-core"]) {
		try {
			candidates.push(fromProject.resolve(name))
		} catch {}
		candidates.push(name)
	}
	for (const candidate of candidates.filter(Boolean)) {
		const specifier = path.isAbsolute(candidate) ? pathToFileURL(candidate).href : candidate
		try {
			const mod = await import(specifier)
			return mod.chromium ?? mod.default?.chromium
		} catch {}
	}
	return null
}

const chromium = await loadChromium()
if (!chromium) {
	console.error("Playwright is not installed here: npm i -D playwright && npx playwright install chromium, or set PLAYWRIGHT_MODULE")
	process.exit(2)
}

const OVERUSED_FONTS = [
	"inter", "geist", "space grotesk", "satoshi", "instrument serif", "clash display", "pp editorial new", "playfair display",
	"cormorant", "fraunces", "dm serif", "general sans", "manrope", "plus jakarta sans", "syne", "jetbrains mono",
]

// Runs inside the page. Everything it returns is plain data.
function measure(overusedFonts) {
	const vw = window.innerWidth
	const visible = (el) => {
		const r = el.getBoundingClientRect()
		const s = getComputedStyle(el)
		return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && Number(s.opacity) > 0.05
	}
	const ownText = (el) =>
		[...el.childNodes]
			.filter((n) => n.nodeType === Node.TEXT_NODE)
			.map((n) => n.textContent)
			.join("")
			.trim()
	const parse = (c) => {
		const m = c.match(/rgba?\(([^)]+)\)/)
		if (!m) return null
		const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number)
		return { r, g, b, a }
	}
	const lum = ({ r, g, b }) => {
		const ch = [r, g, b].map((v) => {
			const s = v / 255
			return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
		})
		return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
	}
	const blend = (top, under) => ({
		r: top.r * top.a + under.r * (1 - top.a),
		g: top.g * top.a + under.g * (1 - top.a),
		b: top.b * top.a + under.b * (1 - top.a),
		a: 1,
	})
	// The colour behind an element, or null when an image or gradient sits behind it.
	const backdrop = (el) => {
		const layers = []
		for (let n = el; n; n = n.parentElement) {
			const s = getComputedStyle(n)
			if (s.backgroundImage !== "none") return null
			const c = parse(s.backgroundColor)
			if (c && c.a > 0) {
				layers.push(c)
				if (c.a >= 1) break
			}
		}
		let colour = { r: 255, g: 255, b: 255, a: 1 }
		for (const c of layers.reverse()) colour = blend(c, colour)
		return colour
	}
	const ratio = (a, b) => {
		const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
		return (l1 + 0.05) / (l2 + 0.05)
	}
	const label = (el) => {
		const t = (ownText(el) || el.textContent || "").trim().replace(/\s+/g, " ")
		return t.length > 70 ? `${t.slice(0, 67)}…` : t
	}

	const all = [...document.body.querySelectorAll("*")].filter(visible)
	const texts = all.filter((el) => ownText(el).length > 1 && !el.closest("svg, script, style, noscript"))

	const contrast = []
	const smallBody = []
	const eyebrows = []
	const monoLabels = []
	const numbered = []
	for (const el of texts) {
		const s = getComputedStyle(el)
		const size = parseFloat(s.fontSize)
		const bold = Number(s.fontWeight) >= 700
		const large = size >= 24 || (size >= 18.66 && bold)
		const fg = parse(s.color)
		const bg = backdrop(el)
		const text = ownText(el)
		if (fg && bg) {
			const r = ratio(blend(fg, bg), bg)
			const need = large ? 3 : 4.5
			if (r < need) contrast.push({ text: label(el), ratio: Number(r.toFixed(2)), need, size })
		}
		if (!large && size < 16 && text.length > 80 && !el.closest("footer, small, figcaption, label, button")) {
			smallBody.push({ text: label(el), size })
		}
		const tracking = parseFloat(s.letterSpacing) || 0
		if (s.textTransform === "uppercase" && tracking / size >= 0.04 && size <= 15 && text.length < 50) {
			eyebrows.push(label(el))
		}
		if (/mono/i.test(s.fontFamily) && text.length < 40 && !el.closest("code, pre, kbd, samp, table")) {
			monoLabels.push(label(el))
		}
		if (/^[[(/]\s*\d{1,2}\s*[\])]?$|^0\d[.)\]]?$|^[[(]?0\d[\])]?\s*[/—–-]/.test(text)) numbered.push(label(el))
	}

	const headings = [...document.querySelectorAll("h1, h2, h3")].filter(visible).map((h) => h.innerText.trim().replace(/\s+/g, " "))
	const slogan = (h) => h.endsWith(".") && h.split(/\s+/).length <= 6
	let run = 0
	let longestSloganRun = 0
	for (const h of headings) {
		run = slogan(h) ? run + 1 : 0
		longestSloganRun = Math.max(longestSloganRun, run)
	}
	const slogans = headings.filter(slogan).length

	const fonts = new Map()
	for (const el of texts) {
		const family = getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim()
		fonts.set(family, (fonts.get(family) || 0) + 1)
	}
	const overused = [...fonts.keys()].filter((f) => overusedFonts.includes(f.toLowerCase()))

	// Sections: the tall direct blocks of <main>, or of <body> when there is no <main>.
	const root = document.querySelector("main") || document.body
	let blocks = [...root.children].filter((el) => visible(el) && el.getBoundingClientRect().height > 200)
	if (blocks.length === 1 && blocks[0].children.length > 2) {
		blocks = [...blocks[0].children].filter((el) => visible(el) && el.getBoundingClientRect().height > 200)
	}
	const signature = (sec) => {
		const r = sec.getBoundingClientRect()
		const columns = new Set()
		const walk = (el, depth) => {
			for (const c of el.children) {
				const cr = c.getBoundingClientRect()
				if (cr.width > 80 && cr.height > 40 && cr.width < r.width * 0.9) columns.add(Math.round((cr.left - r.left) / (r.width / 12)))
				if (depth < 3) walk(c, depth + 1)
			}
		}
		walk(sec, 0)
		const image = !!sec.querySelector("img, picture, video")
		const fullBleed = r.width >= vw * 0.98
		const heading = sec.querySelector("h1, h2, h3")
		const hr = heading?.getBoundingClientRect()
		const headingSide = hr ? (hr.left + hr.width / 2 < r.left + r.width / 2 ? "left" : "right") : "none"
		return `${Math.min(columns.size, 4)}col/${image ? "img" : "noimg"}/${fullBleed ? "bleed" : "contained"}/${headingSide}`
	}
	const signatures = blocks.map(signature)
	let same = 1
	let longestSameRun = signatures.length ? 1 : 0
	for (let i = 1; i < signatures.length; i++) {
		same = signatures[i] === signatures[i - 1] ? same + 1 : 1
		longestSameRun = Math.max(longestSameRun, same)
	}
	const counts = new Map()
	for (const s of signatures) counts.set(s, (counts.get(s) || 0) + 1)
	const dominant = Math.max(0, ...counts.values())

	const images = [...document.images].filter(visible).map((img) => {
		const r = img.getBoundingClientRect()
		return { src: img.currentSrc.split("/").pop().split("?")[0], alt: img.alt, width: Math.round(r.width), height: Math.round(r.height) }
	})
	const illustrative = images.filter((i) => /illustrat|generat|\bai\b|midjourney|dall|firefly|stable.?diffusion|render/i.test(`${i.alt} ${i.src}`))

	// Palette: colours declared as custom properties on :root that no element uses. Component-library role tokens
	// (shadcn/ui and similar) are not the brand palette and often go unused on a marketing page.
	const COMPONENT_TOKENS =
		/^--(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring|chart-\d|sidebar)(-|$)/
	const probe = document.createElement("i")
	document.body.append(probe)
	const toRgb = (value) => {
		probe.style.color = ""
		probe.style.color = value
		return probe.style.color ? getComputedStyle(probe).color : null
	}
	const declared = []
	for (const sheet of document.styleSheets) {
		let rules
		try {
			rules = sheet.cssRules
		} catch {
			continue
		}
		for (const rule of rules) {
			if (rule.selectorText !== ":root" || !rule.style) continue
			for (const prop of rule.style) {
				if (!prop.startsWith("--") || COMPONENT_TOKENS.test(prop)) continue
				const value = rule.style.getPropertyValue(prop).trim()
				const rgb = /^(#|rgb|hsl|oklch|oklab|lab|lch|color\()/i.test(value) ? toRgb(value) : null
				if (rgb) declared.push({ token: prop, value, rgb })
			}
		}
	}
	probe.remove()
	const used = new Set()
	for (const el of all) {
		const s = getComputedStyle(el)
		for (const c of [s.color, s.backgroundColor, s.borderTopColor, s.borderBottomColor, s.fill, s.stroke, s.outlineColor]) used.add(c)
	}
	const unusedColours = declared.filter((d) => !used.has(d.rgb)).map((d) => `${d.token}: ${d.value}`)

	// Second-order tells.
	const second = []
	const has = (test) => all.filter(test)
	const marquee = has((el) => {
		const s = getComputedStyle(el)
		return el.tagName === "MARQUEE" || (/marquee|ticker/i.test(`${el.className}`) && s.animationName !== "none") || (s.animationName !== "none" && el.scrollWidth > el.parentElement.clientWidth * 1.8 && el.getBoundingClientRect().height < 160)
	})
	if (marquee.length) second.push({ key: "marquee", text: `marquee or ticker (${marquee.length})` })
	const outlined = has((el) => parseFloat(getComputedStyle(el).webkitTextStrokeWidth) > 0 && ownText(el))
	if (outlined.length) second.push({ key: "outlined", text: `outlined text: ${outlined.slice(0, 3).map(label).join(" | ")}` })
	const rotated = has((el) => {
		const m = getComputedStyle(el).transform.match(/matrix\(([^,]+),\s*([^,]+)/)
		if (!m) return false
		const deg = Math.abs((Math.atan2(Number(m[2]), Number(m[1])) * 180) / Math.PI)
		const r = el.getBoundingClientRect()
		return deg > 2 && deg < 25 && r.width < 300 && r.height < 200
	})
	if (rotated.length) second.push({ key: "sticker", text: `rotated badges or stickers: ${rotated.slice(0, 3).map(label).join(" | ")}` })
	const grain = has((el) => {
		const b = `${getComputedStyle(el).backgroundImage} ${getComputedStyle(el, "::before").backgroundImage} ${getComputedStyle(el, "::after").backgroundImage}`
		return /noise|grain|feTurbulence/i.test(b)
	})
	if (grain.length || document.querySelector("feTurbulence")) second.push({ key: "grain", text: "grain or noise overlay" })
	if (["html", "body"].some((t) => getComputedStyle(document.querySelector(t)).cursor === "none") || has((el) => /cursor/i.test(`${el.className}`) && getComputedStyle(el).position === "fixed").length) {
		second.push({ key: "cursor", text: "custom cursor" })
	}
	const bento = has((el) => {
		const s = getComputedStyle(el)
		if (s.display !== "grid" || el.children.length < 4) return false
		const spans = new Set([...el.children].map((c) => `${getComputedStyle(c).gridColumnEnd}/${getComputedStyle(c).gridRowEnd}`))
		return spans.size >= 2 && [...spans].some((x) => /span [2-9]/.test(x))
	})
	if (bento.length) second.push({ key: "bento", text: `bento grid (${bento.length})` })
	const glassNav = has((el) => /blur/.test(getComputedStyle(el).backdropFilter) && ["fixed", "sticky"].includes(getComputedStyle(el).position) && parseFloat(getComputedStyle(el).borderRadius) > 16)
	if (glassNav.length) second.push({ key: "glass-nav", text: "floating glass navigation" })
	const footer = document.querySelector("footer")
	const wordmark = footer && [...footer.querySelectorAll("*")].filter(visible).find((el) => ownText(el) && parseFloat(getComputedStyle(el).fontSize) > vw * 0.12)
	if (wordmark) second.push({ key: "wordmark", text: `full-width footer wordmark: ${label(wordmark)}` })
	if (eyebrows.length > 2) second.push({ key: "labels", text: `uppercase tracked labels (${eyebrows.length})` })
	if (monoLabels.length > 2) second.push({ key: "mono", text: `monospace micro-labels (${monoLabels.length})` })
	if (overused.length) second.push({ key: "font", text: `overused typeface: ${overused.join(", ")}` })

	return {
		overflow: document.documentElement.scrollWidth > vw + 1,
		contrast,
		smallBody,
		eyebrows,
		monoLabels,
		numbered,
		headings,
		longestSloganRun,
		slogans,
		fonts: Object.fromEntries(fonts),
		signatures,
		longestSameRun,
		dominant,
		images,
		illustrative,
		unusedColours,
		second,
	}
}

// Opens the page and scrolls it through once, so content that reveals on scroll is shown before it is captured.
async function open(browser, width, scale) {
	const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: scale })
	await page.goto(url, { waitUntil: "networkidle" })
	await page.evaluate(async () => {
		for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
			window.scrollTo(0, y)
			await new Promise((r) => setTimeout(r, 250))
		}
		window.scrollTo(0, 0)
	})
	await page.waitForTimeout(1500)
	return page
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const results = {}
try {
	await mkdir(out, { recursive: true })
	for (const width of widths) {
		const page = await open(browser, width, 1)
		await page.screenshot({ path: path.join(out, `page-${width}.png`), fullPage: true })
		results[width] = await page.evaluate(measure, OVERUSED_FONTS)
		await page.close()
		const small = await open(browser, width, 0.2)
		await small.screenshot({ path: path.join(out, `thumbnail-${width}.png`), fullPage: true })
		await small.close()
	}
} finally {
	await browser.close()
}

const desktop = results[widths[0]]
const unique = (list) => [...new Set(list)]
const warn = []
const failures = []
for (const [width, r] of Object.entries(results)) {
	if (r.overflow) failures.push(`${width}px: the page scrolls sideways`)
	for (const c of r.contrast) failures.push(`contrast ${c.ratio}:1 (needs ${c.need}:1) on “${c.text}”`)
}
const hard = unique(failures)
if (desktop.illustrative.length) {
	warn.push(`Illustrative or generated images: ${desktop.illustrative.map((i) => `${i.src} (${i.width}×${i.height})`).join(", ")}. Generated people in the hero or as proof fail the review gate.`)
}
const unexplained = desktop.second.filter((t) => !allowed.includes(t.key))
const explained = desktop.second.filter((t) => allowed.includes(t.key))
if (unexplained.length >= 2) hard.push(`Second-order tells with no recorded content reason: ${unexplained.map((t) => `${t.text} [${t.key}]`).join("; ")}`)
else if (unexplained.length) warn.push(`Second-order tell: ${unexplained[0].text} [${unexplained[0].key}]`)
if (desktop.longestSameRun >= 3) warn.push(`${desktop.longestSameRun} sections in a row share one layout (${desktop.signatures.join(" → ")})`)
if (desktop.signatures.length >= 4 && desktop.dominant / desktop.signatures.length > 0.6) {
	warn.push(`${desktop.dominant} of ${desktop.signatures.length} sections use the same layout; break the pattern at least once`)
}
if (desktop.longestSloganRun >= 3 || (desktop.slogans >= 3 && desktop.slogans > desktop.headings.length / 2)) {
	warn.push(`${desktop.slogans} of ${desktop.headings.length} headlines are short slogans ending in a full stop`)
}
if (desktop.eyebrows.length) warn.push(`Uppercase tracked labels: ${unique(desktop.eyebrows).slice(0, 6).join(" | ")}`)
if (desktop.numbered.length) warn.push(`Numbering that may be decorative: ${unique(desktop.numbered).slice(0, 6).join(" | ")}`)
if (desktop.smallBody.length) warn.push(`Body text under 16px: ${desktop.smallBody.length} blocks, e.g. “${desktop.smallBody[0].text}” (${desktop.smallBody[0].size}px)`)
if (desktop.unusedColours.length) warn.push(`Palette colours used nowhere: ${desktop.unusedColours.join(", ")}`)

const report = [
	`# Slop check: ${url}`,
	"",
	`Widths: ${widths.join(", ")}px. Screenshots and thumbnails are in ${out}/.`,
	"",
	`## Hard failures (${hard.length})`,
	...(hard.length ? hard.map((h) => `- ${h}`) : ["- none"]),
	"",
	...(explained.length ? [`Allowed by DESIGN.md: ${explained.map((t) => t.text).join("; ")}`, ""] : []),
	`## Warnings (${warn.length})`,
	"A warning stands unless DESIGN.md records the content reason for it.",
	...(warn.length ? warn.map((w) => `- ${w}`) : ["- none"]),
	"",
	"## Read these yourself",
	"Headlines in order:",
	...desktop.headings.map((h) => `- ${h}`),
	"",
	`Section layouts: ${desktop.signatures.join(" → ") || "none found"}`,
	`Typefaces: ${Object.entries(desktop.fonts).map(([f, n]) => `${f} (${n})`).join(", ")}`,
	`Images: ${desktop.images.map((i) => `${i.src} “${i.alt}”`).join("; ") || "none"}`,
	"",
	"This script measures; it does not judge. Open the thumbnails and the full screenshots before signing off.",
].join("\n")

await writeFile(path.join(out, "report.md"), report)
await writeFile(path.join(out, "report.json"), JSON.stringify(results, null, 2))
console.log(report)
process.exit(hard.length ? 1 : 0)
