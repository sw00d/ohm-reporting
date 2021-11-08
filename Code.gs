function CURRENCY_PRICE(currency) {
  const resp = UrlFetchApp.fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`)
  const price = JSON.parse(resp.getContentText())['data']['rates']['USD']
  return price
}

function sOHM_BALANCE() {
  const url = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f&address=0xff48c285db99794d9e32bb79d7e93ca5cd41a518&tag=latest&apikey=YourApiKeyToken'
  const resp = UrlFetchApp.fetch(url)
  return JSON.parse(resp.getContentText())['result'] / (10 ** 9)
}

function TIME_TO_NEXT_REBASE(_, get_time) {
  const BLOCK_RATE_SECONDS = 13.14;
  const current_block = get_current_block()
  const rebase_block = get_rebase_block(current_block)
  const sec = (rebase_block - current_block) * BLOCK_RATE_SECONDS
  if (get_time) {
    const date = new Date().getTime() + sec * 1000
    return new Date(date)
  }
  return format_seconds(sec)
}

function CURRENT_APY(){
  const data = {
    query: "{protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {currentAPY}}"
  };
  const payload = JSON.stringify(data);
  const options = {"method" : "POST","contentType" : "application/json", "payload" : payload};
  const url = "https://api.thegraph.com/subgraphs/name/drondin/olympus-graph";
  const APY = JSON.parse(UrlFetchApp.fetch(url, options)).data.protocolMetrics[0].currentAPY
  return Math.ceil(APY * 100) / 100;
}