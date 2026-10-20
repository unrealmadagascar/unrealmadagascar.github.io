//------------Helpers----------------
function removeProcessById(dizi, id) {
  return dizi.filter((item) => item.process !== id);
}

//-------------Main Function----------------
function Run() {
  const form = document.getElementById("roadRunner");
  var wl = document.getElementById("select_work").value;
  var sch = document.getElementById("select_alg").value;
  console.log(sch);
  if (sch == "0") {
    alert("Scheduling algoritması seçilmeli");
    return;
  }
  const rows = document.querySelectorAll("#tableProcessBody tr");
  const processList = [];

  rows.forEach((row) => {
    // 2. Satırın içerisindeki TÜM input elementlerini bir DİZİ (NodeList) olarak alıyoruz
    const inputs = row.querySelectorAll("input");

    // Satırda en az 3 adet input (Process, Arrival, Burst) olduğundan emin oluyoruz
    if (inputs.length >= 3) {
      // 🚀 Dizi mantığına göre indekslerle (0, 1, 2) değerleri alıyoruz:
      const processName = inputs[0].value.trim(); // İlk input (Process Name)
      const arrivalTime = inputs[1].value; // İkinci input (Arrival Time)
      const cpuBurst = inputs[2].value; // Üçüncü input (CPU Burst)

      // Boş satırları filtrelemek için kontrol
      if (processName !== "") {
        processList.push({
          process: processName,
          arrivalTime: Number(arrivalTime) || 0,
          cpuBurst: Number(cpuBurst) || 0,
        });
      }
    }
  });

  console.log("Dizi indeksleri kullanılarak toplanan veriler:", processList);

  if (processList.length === 0) {
    alert("Tabloda geçerli proses verisi bulunamadı");
    return;
  }

  alert(`${processList.length} adet proses başarıyla alındı.`);

  switch (sch) {
    case "1":
      FCFS(processList);

      break; // Diğer case'lere geçmesini engellemek için ŞARTTIR!

    case "2":
      SJF(processList);
      break;

    case "3":
      SRTF(processList);
      break;

    case "4":
      var timeQuantum = document.getElementById("timeQuantum").value;

      break;

    default:
      // Yukarıdaki seçeneklerin hiçbiriyle eşleşmezse çalışacak varsayılan kod
      console.log("Tanımlanmayan bir seçim yapıldı.");
      break;
  }
}

// Function to Add Process
function Add() {
  var txtId = document.getElementById("txtId");
  var txtArrival = document.getElementById("txtArrival");
  var txtBurst = document.getElementById("txtBurst");
  AddProcess(txtId.value, txtArrival.value, txtBurst.value);
  txtId.value = "";
  txtArrival.value = "";
  txtBurst.value = "";
}
function AddProcess(process_id, arrival_time, cpu_burst) {
  var tBody = document
    .getElementById("tblProcess")
    .getElementsByTagName("TBODY")[0];

  //Add Row.
  row = tBody.insertRow(-1);

  //Add Name cell.
  var cell = row.insertCell(-1);
  var process = document.createElement("input");
  process.type = "text";
  process.value = process_id;
  cell.appendChild(process);

  //Add Country cell.
  cell = row.insertCell(-1);
  var arrival = document.createElement("input");
  arrival.type = "number";
  arrival.value = arrival_time;
  cell.appendChild(arrival);

  cell = row.insertCell(-1);
  var burst = document.createElement("input");
  burst.type = "number";
  burst.value = cpu_burst;
  cell.appendChild(burst);

  //Add Button cell.
  cell = row.insertCell(-1);
  var btnRemove = document.createElement("INPUT");
  btnRemove.type = "button";
  btnRemove.value = "Remove";
  btnRemove.setAttribute("onclick", "Remove(this);");
  cell.appendChild(btnRemove);
}

function Remove(button) {
  //Determine the reference of the Row using the Button.
  var row = button.parentNode.parentNode;
  //Get the reference of the Table.
  var table = document.getElementById("tblProcess");
  //Delete the Table row using it's Index.
  table.deleteRow(row.rowIndex);
}

function RemoveTableBody() {
  const tbody = document.getElementById("tableProcessBody");
  tbody.innerHTML = "";
}
function handleAlgorithmChange() {
  const algorithmSelect = document.getElementById("select_alg");
  const quantumGroup = document.getElementById("quantumGroup");

  if (algorithmSelect.value == "4") {
    quantumGroup.classList.remove("hidden"); // RR seçildiyse gizliliği kaldır, göster
  } else {
    quantumGroup.classList.add("hidden"); // Diğerleriyse tekrar gizle
  }
}
function ChoosedWorkload(cw) {
  switch (cw) {
    case "0":
      RemoveTableBody();
      break; // Diğer case'lere geçmesini engellemek için ŞARTTIR!

    case "a":
      RemoveTableBody();
      const workloadAData = [
        { name: "P1", arrival: 0, burst: 8 },
        { name: "P2", arrival: 1, burst: 4 },
        { name: "P3", arrival: 2, burst: 2 },
        { name: "P4", arrival: 4, burst: 1 },
      ];

      // Verileri input kutuları halinde sırayla tabloya basıyoruz
      workloadAData.forEach((item) => {
        AddProcess(item.name, item.arrival, item.burst);
      });
      break;

    case "b":
      RemoveTableBody();
      const workloadBData = [
        { name: "P1", arrival: 2, burst: 3 },
        { name: "P2", arrival: 2, burst: 1 },
        { name: "P3", arrival: 8, burst: 2 },
        { name: "P4", arrival: 9, burst: 1 },
      ];
      workloadBData.forEach((item) => {
        AddProcess(item.name, item.arrival, item.burst);
      });
      break;
    case "c":
      RemoveTableBody();
      const workloadCData = [
        { name: "P1", arrival: 3, burst: 1 },
        { name: "P2", arrival: 2, burst: 3 },
        { name: "P3", arrival: 8, burst: 2 },
        { name: "P4", arrival: 9, burst: 1 },
      ];
      workloadCData.forEach((item) => {
        AddProcess(item.name, item.arrival, item.burst);
      });
      break;

    default:
      // Yukarıdaki seçeneklerin hiçbiriyle eşleşmezse çalışacak varsayılan kod
      console.log("Tanımlanmayan bir seçim yapıldı.");
      break;
  }
}

//Scheduling algoritmaları

function FCFS(processList) {
  let clock = 0;
  let ganttProcessList = [];

  let processes = processList.toSorted((a, b) => a.arrivalTime - b.arrivalTime);
  for (let i = 0; i < processes.length; i++) {
    if (clock < processes[i].arrivalTime) {
      ganttProcessList.push({
        processId: "Idle",
        start: clock,
        end: processes[i].arrivalTime,
        turnaroundTime: 0,
        waitingTime: 0,
        responseTime: 0,
        isIdle: true,
      });
      clock = processes[i].arrivalTime;
    }

    processes[i].startTime = clock;
    processes[i].completionTime = clock + processes[i].cpuBurst;
    processes[i].turnaroundTime =
      processes[i].completionTime - processes[i].arrivalTime;
    processes[i].waitingTime =
      processes[i].turnaroundTime - processes[i].cpuBurst;
    processes[i].responseTime =
      processes[i].startTime - processes[i].arrivalTime;

    ganttProcessList.push({
      processId: processes[i].process,
      start: processes[i].startTime,
      end: processes[i].completionTime,
      turnaroundTime: processes[i].turnaroundTime,
      waitingTime: processes[i].waitingTime,
      responseTime: processes[i].responseTime,
      isIdle: false,
    });
    clock = processes[i].completionTime;
  }

  renderResultTable(processes, "First-Come, First-Served (FCFS)");
  renderGanttChart(ganttProcessList);
  const reportSection = document.getElementById("reportSection"); // ID'nin doğru olduğundan emin ol
  if (reportSection) {
    reportSection.classList.remove("hidden");
  }
}

function SJF(processList) {
  let clock = 0;
  let ganttProcessList = [];
  let processes = processList.toSorted((a, b) => a.arrivalTime - b.arrivalTime);
  let tempList = processes.map((p) => ({ ...p })); // Deep copy of mainList
  let newList = [];
  let idleTime = 0;

  do {
    let x = tempList.filter((p) => p.arrivalTime <= clock);

    if (x.length !== 0) {
      let y = x.toSorted((a, b) => a.cpuBurst - b.cpuBurst);
      x = 0;
      if (idleTime < y[0].arrivalTime) {
        ganttProcessList.push({
          processId: "Idle",
          start: idleTime,
          end: y[0].arrivalTime,
          turnaroundTime: 0,
          waitingTime: 0,
          responseTime: 0,
          isIdle: true,
        });
      }
      y[0].startTime = clock;
      y[0].completionTime = clock + y[0].cpuBurst;
      y[0].turnaroundTime = y[0].completionTime - y[0].arrivalTime;
      y[0].waitingTime = y[0].turnaroundTime - y[0].cpuBurst;
      y[0].responseTime = y[0].startTime - y[0].arrivalTime;
      newList.push(y[0]);
      tempList = removeProcessById(tempList, y[0].process);
      clock = y[0].completionTime;
      idleTime = clock;
      ganttProcessList.push({
        processId: y[0].process,
        start: y[0].startTime,
        end: y[0].completionTime,
        turnaroundTime: y[0].turnaroundTime,
        waitingTime: y[0].waitingTime,
        responseTime: y[0].responseTime,
        isIdle: false,
      });
    } else {
      clock++;
    }
  } while (tempList.length !== 0);
  renderResultTable(newList, "Shortest Job First (SJF - non-preemptive)");
  renderGanttChart(ganttProcessList);
  const reportSection = document.getElementById("reportSection"); // ID'nin doğru olduğundan emin ol
  if (reportSection) {
    reportSection.classList.remove("hidden");
  }
}

function SRTF(processList) {
  let clock = 0;
  let ganttProcessList = [];
  let processes = processList.toSorted((a, b) => a.arrivalTime - b.arrivalTime);
  let tempList = processes.map((p) => ({ ...p })); // Deep copy of mainList
  let itemList = [];
  let idleTime = 0;
  do {
    let x = tempList.filter((p) => p.arrivalTime <= clock);
    if (x.length !== 0) {
      //process varsa processleri sıralayıp seçtiği process'e göre idle time oluştur.
      //Seçtiği process'in burst 1 azalt,clock u attrı çünkü bu bir işlem.
      //tempListteki processin burst unu azalt, eğer burst 0 ise tempListten sil
      let y = x.toSorted((a, b) => a.cpuBurst - b.cpuBurst);
      x = 0;
      if (idleTime < y[0].arrivalTime) {
        ganttProcessList.push({
          processId: "Idle",
          start: idleTime,
          end: y[0].arrivalTime,
          turnaroundTime: 0,
          waitingTime: 0,
          responseTime: 0,
          isIdle: true,
        });
      }
      
    }

    
    console.log(ganttProcessList);
  } while (clock < 100);

  /* renderResultTable(newList, "Shortest Remaining Time First (SRTF)");
  renderGanttChart(ganttProcessList);
  const reportSection = document.getElementById("reportSection"); // ID'nin doğru olduğundan emin ol
  if (reportSection) {
    reportSection.classList.remove("hidden");
  } */
}

function RR(processList) {}

// Sol Tabloyu Doldurma
function renderResultTable(processes, name) {
  const tbody = document.querySelector("#processTable tbody");
  const theader = document.querySelector("#processTable thead");
  if (!tbody) return;
  tbody.innerHTML = "";
  theader.innerHTML = "";
  const rowHeader = document.createElement("tr");
  rowHeader.innerHTML = `
         <tr>
                <th>${name}</th>
                <th>
                    Completion Time<br>
                    <small>(Bitiş Zamanı)</small>
                </th>
                <th>
                    Turnaround time =<br>
                    <small>Completion time – Arrival time</small>
                </th>
                <th>
                    Waiting time =<br>
                    <small>Turnaround time – CPU burst</small>
                </th>
                <th>
                    Response time =<br>
                    <small>First start time – Arrival time</small>
                </th>
            </tr>
        `;
  theader.appendChild(rowHeader);

  processes.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><strong>${p.process}</strong></td>
            <td>${p.completionTime}</td>
            <td>${p.turnaroundTime}</td>
            <td>${p.waitingTime}</td>
            <td>${p.responseTime}</td>
        `;
    tbody.appendChild(row);
  });
}

// Sağ Gantt Şemasını Çizme
function renderGanttChart(ganttData) {
  const container = document.getElementById("ganttChart");
  if (!container) return;

  container.innerHTML = "";

  ganttData.forEach((block) => {
    const duration = block.end - block.start;
    const bar = document.createElement("div");

    bar.className = block.isIdle ? "gantt-bar idle-bar" : "gantt-bar";
    bar.style.width = duration * 40 + "px";

    bar.innerHTML = `
            <span>${block.processId}</span>
            <small>${block.start}-${block.end}</small>
        `;

    container.appendChild(bar);
  });
}
