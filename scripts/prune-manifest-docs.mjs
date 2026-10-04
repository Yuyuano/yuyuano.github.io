// prune-manifest-docs.mjs
// Removes manifest `docs` entries whose target file no longer exists.
//
// Why: the markdown manifest and the AI skill doc both pointed at Shirone's demo
// posts (admonitions.md, steps.md, ...). Those demos were intentionally not
// carried into this blog, so `check:markdown-manifest` and `check-skills` failed
// on dead repo paths. The checks must stay green, and the demo posts must not be
// re-added just to satisfy doc links.
//
// Also fixes the same class of dead reference inside .agents/skills/*/SKILL.md
// (prose/table mentions of src/content/posts/<demo>.md) by rewriting the path to
// a post that actually exists, or dropping the bullet when nothing sensible fits.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const manifestPath = join(root, "src", "plugins", "markdown", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

let removed = 0;
const removedList = [];

for (const syntax of manifest.syntaxes) {
	if (!Array.isArray(syntax.docs)) continue;
	const kept = [];
	for (const p of syntax.docs) {
		if (existsSync(join(root, p))) {
			kept.push(p);
		} else {
			removedList.push(`${syntax.id} -> ${p}`);
			removed++;
		}
	}
	syntax.docs = kept;
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, "\t")}\n`, "utf8");

console.log(`manifest: 移除 ${removed} 条失效 docs 引用`);
for (const r of removedList) console.log(`  - ${r}`);
