function get_rebase_block(currentBlock) {
  const EPOCH_INTERVAL = 2200;

  return currentBlock + EPOCH_INTERVAL - (currentBlock % EPOCH_INTERVAL);
}

function get_current_block() {
  const url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken"
  const resp = UrlFetchApp.fetch(url)
  const current_block = parseInt(JSON.parse(resp.getContentText()).result, 16)
  return current_block
}

function format_seconds(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
  // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay; // Removed the seconds display to conserve space on sheet - DF
  // return hDisplay + mDisplay + sDisplay;
}