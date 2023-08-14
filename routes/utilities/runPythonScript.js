const { spawn } = require('child_process');

// Export the function to be used in other modules
module.exports = async function runPythonScript(jsonString) {
  
  const pythonProcess = spawn('./python.exe', ['routes/utilities/password.py', jsonString]);
  let stdoutData = '';
  let stderrData = '';
console.log('hi');

pythonProcess.stdout.on('data', (data) => {
    console.log('h0');
    stdoutData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  return new Promise((resolve, reject) => {
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData);
      } else {
        reject(new Error(stderrData));
      }
    });

    pythonProcess.on('error', (err) => {
      reject(err);
    });
  });
};
