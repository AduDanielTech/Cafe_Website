
let isProcessing = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForProcessing() {
  while (isProcessing) {
    await delay(100);
  }
}

async function processWithSemaphore(fn) {
  await waitForProcessing();
  isProcessing = true;

  try {
    await fn();
  } catch (err) {
    console.error(err);
  } finally {
    isProcessing = false;
  }
}

module.exports = {processWithSemaphore}