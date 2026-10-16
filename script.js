
function Run()
{
    const form = document.getElementById('roadRunner');
    var wl=document.getElementById("select_work").value;
    var sch=document.getElementById("select_alg").value;
    console.log(sch)
    if (sch == "0" ) {
        alert("Scheduling algoritması seçilmeli");
        return;
    };
    const rows = document.querySelectorAll('#tableProcessBody tr');
    const processList = [];

     rows.forEach(row => {
        // 2. Satırın içerisindeki TÜM input elementlerini bir DİZİ (NodeList) olarak alıyoruz
        const inputs = row.querySelectorAll('input');

        // Satırda en az 3 adet input (Process, Arrival, Burst) olduğundan emin oluyoruz
        if (inputs.length >= 3) {
            
            // 🚀 Dizi mantığına göre indekslerle (0, 1, 2) değerleri alıyoruz:
            const processName = inputs[0].value.trim(); // İlk input (Process Name)
            const arrivalTime = inputs[1].value;        // İkinci input (Arrival Time)
            const cpuBurst    = inputs[2].value;        // Üçüncü input (CPU Burst)

            // Boş satırları filtrelemek için kontrol
            if (processName !== "") {
                processList.push({
                    process: processName,
                    arrivalTime: Number(arrivalTime) || 0,
                    cpuBurst: Number(cpuBurst) || 0
                });
            }
        }
    });

    console.log("Dizi indeksleri kullanılarak toplanan veriler:", processList);
    
    if (processList.length === 0 ) {
        alert("Tabloda geçerli proses verisi bulunamadı");
        return;
    }

    alert(`${processList.length} adet proses başarıyla alındı.`);

    switch (sch) {
        
        case "1":
            console.log("1 seçildi.");

            break; // Diğer case'lere geçmesini engellemek için ŞARTTIR!

        case "2":
            console.log("Workload A seçildi.");
            break;

        case "3":
            console.log("Gelecekte ekleyebileceğiniz başka bir iş yükü...");
            break;

        case "4":
            var timeQuantum = document.getElementById("timeQuantum").value;

            break;

        default:
            // Yukarıdaki seçeneklerin hiçbiriyle eşleşmezse çalışacak varsayılan kod
            console.log("Tanımlanmayan bir seçim yapıldı.");
            break;
    }


};

// Function to Add Process
function Add()
{
            var txtId = document.getElementById("txtId");
            var txtArrival = document.getElementById("txtArrival");
            var txtBurst = document.getElementById("txtBurst");
            AddProcess(txtId.value, txtArrival.value,txtBurst.value);
            txtId.value = "";
            txtArrival.value = "";
            txtBurst.value="";
};
function AddProcess(process_id,arrival_time,cpu_burst) {
            var tBody = document.getElementById("tblProcess").getElementsByTagName("TBODY")[0];
 
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
};


function Remove(button) {
    //Determine the reference of the Row using the Button.
    var row = button.parentNode.parentNode;
    //Get the reference of the Table.
    var table = document.getElementById("tblProcess");
    //Delete the Table row using it's Index.
    table.deleteRow(row.rowIndex);

};

function RemoveTableBody()
{
            const tbody = document.getElementById('tableProcessBody');
            tbody.innerHTML = ""; 

};
function handleAlgorithmChange() {
    const algorithmSelect = document.getElementById("select_alg");
    const quantumGroup = document.getElementById("quantumGroup");

    if (algorithmSelect.value == "4") {
        quantumGroup.classList.remove("hidden"); // RR seçildiyse gizliliği kaldır, göster
    } else {
        quantumGroup.classList.add("hidden");    // Diğerleriyse tekrar gizle
    }
};
function ChoosedWorkload(cw)
{

   switch (cw) {
        
        case "0":
            console.log("Without Workload seçildi.");
            RemoveTableBody();
            break; // Diğer case'lere geçmesini engellemek için ŞARTTIR!

        case "a":
            console.log("Workload A seçildi.");
            // Tabloya otomatik veriler ekleme kodlarınız...
            RemoveTableBody();
             const workloadAData = [
                { name: "P1", arrival: 0, burst: 8 },
                { name: "P2", arrival: 1, burst: 4 },
                { name: "P3", arrival: 2, burst: 2 },
                { name: "P4", arrival: 4, burst: 1 }
            ];

            // Verileri input kutuları halinde sırayla tabloya basıyoruz
            workloadAData.forEach(item => {
                AddProcess(item.name, item.arrival, item.burst);
            });
            break;

        case "b":
            console.log("Gelecekte ekleyebileceğiniz başka bir iş yükü...");
            RemoveTableBody();
            const workloadBData = [
                { name: "P1", arrival: 2, burst: 3 },
                { name: "P2", arrival: 2, burst: 1 },
                { name: "P3", arrival: 8, burst: 2 },
                { name: "P4", arrival: 9, burst: 1 }
            ];
            workloadBData.forEach(item => {
                AddProcess(item.name, item.arrival, item.burst);
            });
            break;

        default:
            // Yukarıdaki seçeneklerin hiçbiriyle eşleşmezse çalışacak varsayılan kod
            console.log("Tanımlanmayan bir seçim yapıldı.");
            break;
    }
};

//Scheduling algoritmaları

function FCFS(processList) {



};

function SJF(processList) {


    
};

function SRTF(processList) {


    
};

function RR(processList) {


    
};