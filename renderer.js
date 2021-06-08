function getCpuStats () {
  // get the html element to display the cpu used
  const cpuUsageElement = document.getElementById('cpu-usage');

  api.getCpuUsage().then(data => {
    cpuUsageElement.innerText = Number(data.currentLoad).toFixed(2);
  })
  
  const coreCountElement = document.getElementById('core-count');
  coreCountElement.innerText = api.cpuCount;
}

setInterval(getCpuStats, 1500);