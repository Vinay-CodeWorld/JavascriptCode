class KanbanBoard{
    constructor(){
        //''
    this.ProjectVelocity = document.getElementById('total-tasks');
    this.HighPriorityLoad = document.getElementById('high-load');
    this.taskDescription = document.getElementById('task-desc');
    this.taskPriority = document.getElementById('task-priority');
    this.addBtn = document.getElementById('add-btn');
    this.list_todo = document.getElementById('list-todo');
    this.list_doing = document.getElementById('list-doing');
    this.List_done = document.getElementById('list-done');

    this.markBtn = document.getElementById('mark-btn');
    this.doneBtn = document.getElementById('done-btn');
    this.transactions = [];

        this.addTask = this.addTask.bind(this);

        
        this.addBtn.addEventListener('click', this.addTask);

    }

    loadTransaction(){
       new Promise((resolve)=>{
             setTimeout( ()=>{   
                  resolve([{ id: 1, desc: "Learn JS Classes", priority: "high", status: "done" },
                          { id: 2, desc: "Master 'this' keyword", priority: "high", status: "doing" },
                          { id: 3, desc: "Build Kanban Project", priority: "normal", status: "todo" }])
                },1000);
                
       })
       .then(data=>{
           this.transactions=data;
           this.updateBoard();
       });
    }
      updateBoard() {
        // Clear lists...
        this.list_todo.innerHTML = '';
        this.list_doing.innerHTML = '';
        this.List_done.innerHTML = '';

        this.transactions.forEach(txn => {
            const listItem = document.createElement('li');
            listItem.className = 'task-card'; // Assuming you have CSS for this
            listItem.textContent = `${txn.desc} [${txn.priority}] `; // Added space

            // --- 1. The "Move" Button ---
            // Only show it if the task is NOT done
            if (txn.status !== 'done') {
                const moveBtn = document.createElement('button');
                moveBtn.textContent = 'Next ➡'; // Change text to indicate movement
                moveBtn.style.marginRight = '10px';
                
                // Use arrow function to capture 'this' and 'txn.id'
                moveBtn.addEventListener('click', () => this.moveTaskNext(txn.id));
                
                listItem.appendChild(moveBtn);
            }

            // --- 2. The "Delete" Button ---
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.color = 'red';
            deleteBtn.addEventListener('click', () => this.deleteTask(txn.id));
            listItem.appendChild(deleteBtn);


            // --- 3. Sort into columns ---
            if (txn.status === 'todo') {
                this.list_todo.appendChild(listItem);
            } else if (txn.status === 'doing') {
                this.list_doing.appendChild(listItem);
            } else if (txn.status === 'done') {
                this.List_done.appendChild(listItem);
            }
        });

        this.updateStats();
    }

    updateStats(){
        const totalTasks=this.transactions.length;
        const highPriorityTasks=this.transactions.filter(txn=>txn.priority==='high').length;        
        this.ProjectVelocity.textContent=totalTasks;
        this.HighPriorityLoad.textContent=highPriorityTasks;
    }

    addTask() {
        // Because of the bind() above, 'this' is the Class.
        const desc = this.taskDescription.value;
        const priority = this.taskPriority.value;

        if(desc === '') return alert("Please enter a task");

        // Create the new object
        const newTask = {
            id: Date.now(),
            desc: desc,
            priority: priority,
            status: 'todo' // New tasks always start in Todo
        };

        // Update State (Spread Operator)
        this.transactions = [...this.transactions, newTask];

        // Refresh the screen
        this.updateBoard();
        
        // Clear input
        this.taskDescription.value = '';
    }
   moveTaskNext(id) {
        // We create a NEW array (Immutability)
        this.transactions = this.transactions.map(txn => {
            
            // Find the task
            if (txn.id === id) {
                let newStatus = txn.status;

                // Calculate the Next Step
                if (txn.status === 'todo') {
                    newStatus = 'doing';
                } else if (txn.status === 'doing') {
                    newStatus = 'done';
                }

                // Return the updated task
                return { ...txn, status: newStatus };
            }

            // Return other tasks unchanged
            return txn;
        });

        this.updateBoard();
    }

    deleteTask(id){
        // Remove the task with matching id
        this.transactions = this.transactions.filter(txn => txn && txn.id !== id);
        this.updateBoard();
    }
}

new KanbanBoard().loadTransaction();







