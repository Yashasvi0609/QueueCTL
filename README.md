# 🚀 QueueCTL

> A production-grade Command Line Interface (CLI) Background Job Queue built with **Node.js** and **SQLite**, featuring persistent storage, parallel workers, retry mechanisms, exponential backoff, Dead Letter Queue (DLQ), configurable settings, graceful shutdown, and execution logging.

---

## 📌 Project Overview

QueueCTL is a lightweight background job processing system that allows users to enqueue shell commands and process them asynchronously using worker processes.

The system persists jobs in SQLite, ensuring jobs survive application restarts. It supports automatic retries with exponential backoff, moves permanently failing jobs to a Dead Letter Queue (DLQ), logs execution details, and provides configuration management through CLI commands.

---

# ✨ Features

- ✅ CLI-based job queue
- ✅ Persistent SQLite storage
- ✅ Job enqueueing
- ✅ Job listing with filters
- ✅ Parallel worker support
- ✅ Safe job locking
- ✅ Retry mechanism
- ✅ Configurable retry count
- ✅ Exponential backoff
- ✅ Dead Letter Queue (DLQ)
- ✅ Retry jobs from DLQ
- ✅ Queue status monitoring
- ✅ Runtime configuration management
- ✅ Graceful worker shutdown
- ✅ Job execution logging
- ✅ Basic testing script

---

# 🏗 Architecture

```
                    +------------------+
                    |      CLI         |
                    | queuectl command |
                    +---------+--------+
                              |
               +--------------+--------------+
               |                             |
         Enqueue Jobs                  Worker Manager
               |                             |
               v                             v
        +--------------+           +----------------+
        | SQLite Queue | <-------> | Worker Service |
        +--------------+           +----------------+
               |
               v
      Retry / Backoff / DLQ
               |
               v
          Execution Logs
```

---

# 📂 Project Structure

```
QueueCTL
│
├── logs/
│   └── worker.log
│
├── runtime/
│
├── src/
│   ├── cli/
│   ├── commands/
│   ├── database/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── workers/
│
├── tests/
│   └── test.bat
│
├── package.json
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Yashasvi0609/QueueCTL.git
```

Move into the project

```bash
cd QueueCTL
```

Install dependencies

```bash
npm install
```

Start the CLI

```bash
npm start
```

---

# 🚀 CLI Commands

## Enqueue Job

```bash
node src/cli/index.js enqueue "{\"command\":\"echo Hello\"}"
```

---

## List Jobs

```bash
node src/cli/index.js list
```

Filter by state

```bash
node src/cli/index.js list --state pending
```

---

## Start Worker

```bash
node src/cli/index.js worker start
```

Multiple workers

```bash
node src/cli/index.js worker start --count 3
```

---

## Stop Worker

```bash
node src/cli/index.js worker stop
```

---

## Queue Status

```bash
node src/cli/index.js status
```

---

## Dead Letter Queue

View dead jobs

```bash
node src/cli/index.js dlq list
```

Retry a dead job

```bash
node src/cli/index.js dlq retry <jobId>
```

---

## Configuration

View configuration

```bash
node src/cli/index.js config get
```

Update configuration

```bash
node src/cli/index.js config set max_retries 5
```

Example:

```bash
node src/cli/index.js config set backoff_base 2
```

---

# 🔄 Job Lifecycle

```
Pending
   │
   ▼
Processing
   │
   ├──────────────► Completed
   │
   ▼
Failed
   │
   ▼
Retry
   │
   ▼
Pending
   │
   ▼
Exceeded Max Retries
   │
   ▼
Dead Letter Queue
```

---

# 🔁 Retry Mechanism

When a job fails:

1. Attempts are incremented.
2. Delay is calculated using exponential backoff.
3. Job is rescheduled.
4. Worker retries automatically.
5. After maximum retries, the job is moved to the Dead Letter Queue.

---

# ⚡ Exponential Backoff

Delay formula

```
delay = backoff_base ^ attempts
```

Example (base = 2)

| Attempt | Delay |
|---------:|------:|
| 1 | 2 sec |
| 2 | 4 sec |
| 3 | 8 sec |
| 4 | 16 sec |

---

# ☠ Dead Letter Queue (DLQ)

Jobs that exceed the configured retry limit are automatically moved to the Dead Letter Queue.

Users can:

- View dead jobs
- Retry dead jobs
- Monitor failed executions

---

# 📋 Configuration

QueueCTL supports runtime configuration through SQLite.

Current configurable values include:

| Key | Description |
|------|-------------|
| max_retries | Maximum retry attempts |
| backoff_base | Exponential backoff base |
| worker_stop | Graceful shutdown flag |

---

# 📊 Logging

All worker activity is stored in

```
logs/worker.log
```

Example

```
[2026-07-17T19:06:30.716Z] Processing Job: 8f34dd56
[2026-07-17T19:06:30.776Z] Hello QueueCTL
[2026-07-17T19:06:30.777Z] Job Completed: 8f34dd56
```

---

# 🧪 Testing

Run the basic test suite

```bash
npm test
```

or

```bash
tests\test.bat
```

The test validates:

- Job enqueue
- Job listing
- Queue status
- Worker execution

---

# 🛠 Technologies Used

- Node.js
- Commander.js
- SQLite (better-sqlite3)
- UUID
- Child Process API
- Chalk
- Ora

---

# 🔮 Future Improvements

- REST API
- Web Dashboard
- Redis-backed queue
- RabbitMQ integration
- Docker support
- Kubernetes deployment
- Job scheduling (Cron)
- Priority queues
- Metrics dashboard
- Authentication & RBAC

---

# 👨‍💻 Author

**Yashasvi Chaurasiya**

GitHub:
https://github.com/Yashasvi0609

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Assignment Highlights

This project demonstrates:

- Background job processing
- Persistent queue management
- Concurrent worker execution
- Retry strategies
- Exponential backoff
- Dead Letter Queue implementation
- Runtime configuration
- Graceful shutdown
- Logging
- SQLite persistence
- Production-style CLI design

---

If you found this project helpful, consider giving it a ⭐ on GitHub!