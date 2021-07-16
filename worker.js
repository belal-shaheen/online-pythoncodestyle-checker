importScripts("https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js");

async function loadPyodideAndPackages() {
  await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
  });
}
let pyodideReadyPromise = loadPyodideAndPackages();

addEventListener("message", async (event) => {
  await pyodideReadyPromise;
  const { python, ...context } = event.data;
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  try {
    await self.pyodide.runPythonAsync(
      `
from io import StringIO 
import sys

class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = StringIO()
        return self
    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        del self._stringio    # free up some memory
        sys.stdout = self._stdout
      
import micropip
await micropip.install('pycodestyle')
import pycodestyle
fchecker = pycodestyle.Checker(lines='''${event.data}''')
output = ""

with Capturing() as output:
  file_errors = fchecker.check_all()
output = """\n""".join(output)
    `
    );
    self.postMessage({
      results: pyodide.globals.output,
    });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});
