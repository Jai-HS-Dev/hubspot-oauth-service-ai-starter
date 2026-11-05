const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink() || ['.git', 'node_modules', 'dist', 'build'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(js|mjs|cjs|jsx)$/.test(entry.name)) {
      const options = { encoding: 'utf8' };
      const args = entry.name.endsWith('.jsx') ? ['--input-type=module', '--check'] : ['--check', file];
      // These entrypoints intentionally use plain JavaScript React, not JSX syntax.
      if (entry.name.endsWith('.jsx')) options.input = fs.readFileSync(file, 'utf8');
      const result = spawnSync(process.execPath, args, options);
      if (result.status !== 0) throw new Error('Syntax check failed for ' + path.relative(process.cwd(), file));
      count++;
    }
  }
}
walk(process.cwd());
console.log('Syntax check passed for ' + count + ' source and test modules.');
