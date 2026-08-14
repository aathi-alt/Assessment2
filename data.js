/* ============================================================
   QUESTION BANK
   Topics: RAG · LLM · NLP · AI vs Traditional/Server Logic · Codex · n8n
   Types: "mcq" (single choice) | "text" (short answer / definition / problem-solving)
   Difficulty: easy | intermediate | hard
   For "text" questions grading is keyword-based (see script.js) — this
   keeps the assessment fully static/offline while still giving useful
   feedback. The canonical answer is always shown after submission.
   ============================================================ */

const QUESTIONS = [

  /* ----------------------------- RAG ----------------------------- */
  {
    id: "rag-1", topic: "RAG", difficulty: "easy", type: "mcq",
    question: "What does the acronym RAG stand for in the context of LLM applications?",
    options: [
      "Retrieval-Augmented Generation",
      "Random Access Generation",
      "Rapid AI Grading",
      "Recursive Answer Generation"
    ],
    answerIndex: 0,
    explanation: "RAG = Retrieval-Augmented Generation. The model's answer is generated using content retrieved from an external knowledge source, not from memory alone."
  },
  {
    id: "rag-2", topic: "RAG", difficulty: "easy", type: "text",
    question: "In one or two sentences, define what a RAG pipeline does.",
    keywords: ["retriev", "external", "document", "generat", "search"],
    correctAnswer: "A RAG pipeline retrieves relevant information from an external source (documents, a database, a vector store) and feeds it to the LLM as context so it can generate a more accurate, grounded answer.",
    explanation: "The core idea is: search/retrieve relevant data first, then let the LLM generate an answer using that retrieved context."
  },
  {
    id: "rag-3", topic: "RAG", difficulty: "intermediate", type: "mcq",
    question: "Why is RAG commonly used with LLM-powered assistants?",
    options: [
      "To make the model respond faster regardless of accuracy",
      "To ground answers in retrieved, up-to-date documents and reduce hallucination",
      "To retrain the base model's weights automatically",
      "To reduce the number of tokens the model can accept"
    ],
    answerIndex: 1,
    explanation: "RAG reduces hallucination by grounding the model's response in real, retrieved documents instead of relying purely on what it memorized during training."
  },
  {
    id: "rag-4", topic: "RAG", difficulty: "intermediate", type: "text",
    question: "What role does a vector database play in a RAG system?",
    keywords: ["embed", "similar", "store", "vector", "search"],
    correctAnswer: "A vector database stores text as numeric embeddings and allows similarity search, so the system can quickly find the chunks of text most relevant to a user's query.",
    explanation: "Documents are converted into embeddings (vectors) and stored; at query time, the system finds the most semantically similar chunks to feed into the LLM's context."
  },
  {
    id: "rag-5", topic: "RAG", difficulty: "hard", type: "mcq",
    question: "A company's HR policy documents change every month. They want a chatbot that always answers using the latest policy, without retraining a model each time. What's the best approach?",
    options: [
      "Fine-tune the LLM from scratch every month",
      "Use RAG: keep the documents in a vector store and retrieve the latest version at query time",
      "Increase the model's temperature setting",
      "Only use zero-shot prompting with no external data"
    ],
    answerIndex: 1,
    explanation: "RAG lets you update the underlying documents without ever touching the model — the next retrieval automatically picks up the latest content, which is exactly what's needed for frequently changing information."
  },

  /* ----------------------------- LLM ----------------------------- */
  {
    id: "llm-1", topic: "LLM", difficulty: "easy", type: "mcq",
    question: "LLM stands for:",
    options: ["Long Logic Machine", "Large Language Model", "Linear Learning Method", "Local Language Manager"],
    answerIndex: 1,
    explanation: "LLM = Large Language Model — an AI model trained on huge amounts of text to understand and generate human-like language."
  },
  {
    id: "llm-2", topic: "LLM", difficulty: "easy", type: "text",
    question: "What is a 'token' in the context of how an LLM processes text?",
    keywords: ["piece", "word", "unit", "text", "split", "chunk"],
    correctAnswer: "A token is a small unit of text — a whole word, part of a word, punctuation, or a special character — that an LLM processes instead of reading full sentences the way humans do.",
    explanation: "Tokens are the 'Lego pieces' language models build and process language with. More tokens generally mean more processing and higher cost."
  },
  {
    id: "llm-3", topic: "LLM", difficulty: "intermediate", type: "mcq",
    question: "What is the 'context window' of an LLM?",
    options: [
      "The browser window used to access the chatbot",
      "The amount of information the model can consider at once during a conversation or task",
      "The time limit before the model shuts down",
      "The number of users who can chat with the model simultaneously"
    ],
    answerIndex: 1,
    explanation: "Think of the context window as the size of the model's 'working desk' — it's how much conversation and text it can hold in mind at one time."
  },
  {
    id: "llm-4", topic: "LLM", difficulty: "intermediate", type: "text",
    question: "Define 'AI hallucination' and explain why it happens.",
    keywords: ["incorrect", "fabricat", "wrong", "confiden", "false", "made up"],
    correctAnswer: "An AI hallucination is when a model generates information that sounds convincing but is incorrect, unsupported, or entirely fabricated — because the model is predicting plausible-sounding text, not looking up verified facts.",
    explanation: "LLMs predict the most statistically likely next tokens based on training patterns, not by retrieving a verified stored answer, so they can state false information confidently."
  },
  {
    id: "llm-5", topic: "LLM", difficulty: "hard", type: "text",
    question: "A student asks an LLM for research papers by a specific professor, and the model confidently lists titles, journals, and dates — but the papers don't actually exist. What went wrong, and what should the student do next time?",
    keywords: ["hallucinat", "verify", "check", "source", "confirm"],
    correctAnswer: "This is a classic hallucination — the model generated plausible-looking but fabricated citations. The student should always verify important AI-generated facts against trusted sources (official websites, journals, documentation) before relying on them.",
    explanation: "Never blindly trust AI-generated information, especially specific facts like citations, dates, or statistics — cross-check with a trusted source."
  },

  /* ----------------------------- NLP ----------------------------- */
  {
    id: "nlp-1", topic: "NLP", difficulty: "easy", type: "mcq",
    question: "NLP stands for:",
    options: ["Natural Language Processing", "Neural Learning Pipeline", "New Language Program", "Network Layer Protocol"],
    answerIndex: 0,
    explanation: "NLP = Natural Language Processing, the branch of AI focused on enabling computers to understand, interpret, and generate human language."
  },
  {
    id: "nlp-2", topic: "NLP", difficulty: "easy", type: "text",
    question: "In your own words, what is NLP used for?",
    keywords: ["language", "text", "understand", "process", "speech"],
    correctAnswer: "NLP is the field of AI concerned with enabling machines to read, understand, interpret, and generate human language, such as text and speech.",
    explanation: "Examples include translation, sentiment analysis, chatbots, spam detection, and voice assistants — anything involving understanding human language."
  },
  {
    id: "nlp-3", topic: "NLP", difficulty: "intermediate", type: "mcq",
    question: "Which of the following is NOT a typical NLP task?",
    options: [
      "Sentiment analysis of product reviews",
      "Machine translation between languages",
      "Classifying whether a photo contains a cat or a dog",
      "Named entity recognition (finding names, places, dates in text)"
    ],
    answerIndex: 2,
    explanation: "Classifying an image is a computer vision task, not an NLP task — NLP works specifically with language/text, not pixels."
  },
  {
    id: "nlp-4", topic: "NLP", difficulty: "intermediate", type: "text",
    question: "What is 'tokenization' in NLP/LLM pipelines?",
    keywords: ["split", "break", "unit", "word", "token"],
    correctAnswer: "Tokenization is the process of breaking text into smaller units (tokens) — words, sub-words, or characters — so a language model can process it numerically.",
    explanation: "Before a model can predict or understand text, the raw sentence has to be split into tokens it can work with."
  },
  {
    id: "nlp-5", topic: "NLP", difficulty: "hard", type: "text",
    question: "You need to build a feature that automatically flags incoming emails as spam or not-spam based on their content. Which NLP technique/task is this, and briefly describe the approach.",
    keywords: ["classif", "spam", "text", "label", "supervised"],
    correctAnswer: "This is a text classification task (a form of supervised learning): the model is trained on labeled examples (spam vs. not-spam emails) so it learns patterns in the text and can classify new, unseen emails.",
    explanation: "Spam detection is a classic NLP text-classification problem — closely related to sentiment analysis, where text is mapped to a predefined category."
  },

  /* -------------------- AI vs Traditional/Server Logic -------------------- */
  {
    id: "aiv-1", topic: "AI vs Server", difficulty: "easy", type: "mcq",
    question: "In traditional (rule-based) programming, who writes the rules the program follows?",
    options: [
      "The system discovers the rules on its own from data",
      "The programmer writes every rule by hand",
      "The end user defines the rules at runtime",
      "The rules are randomly generated"
    ],
    answerIndex: 1,
    explanation: "Traditional programming follows: Rules + Data → Program → Output. A human explicitly codes every IF/THEN condition."
  },
  {
    id: "aiv-2", topic: "AI vs Server", difficulty: "easy", type: "text",
    question: "In one sentence, what is the key difference between traditional programming and machine learning?",
    keywords: ["rule", "learn", "data", "pattern", "explicit"],
    correctAnswer: "In traditional programming a human writes explicit rules to produce an output, while in machine learning the system learns patterns directly from data and examples instead of being told every rule.",
    explanation: "Traditional: Rules + Data → Program → Output. Machine Learning: Data + Expected Output → Learning Algorithm → Model."
  },
  {
    id: "aiv-3", topic: "AI vs Server", difficulty: "intermediate", type: "mcq",
    question: "Which sequence correctly describes the machine learning approach (as opposed to traditional server-side logic)?",
    options: [
      "IF condition THEN action, hand-coded by a developer",
      "Data + Expected Output → Learning Algorithm → Model",
      "A fixed lookup table that never changes",
      "A static server response with no data involved"
    ],
    answerIndex: 1,
    explanation: "ML flips the traditional model: instead of hand-coding rules, you feed the system data and expected outputs, and a learning algorithm produces a model that generalizes the pattern."
  },
  {
    id: "aiv-4", topic: "AI vs Server", difficulty: "intermediate", type: "text",
    question: "Give one real-world example each of Narrow AI and General AI (AGI), and note which one actually exists today.",
    keywords: ["narrow", "agi", "general", "specific", "not yet", "theoretical"],
    correctAnswer: "Narrow AI example: a spam filter or face recognition system (built for one specific task) — this exists today and is what almost all current AI systems are. AGI, a system that could perform any intellectual task a human can, is still theoretical / not yet achieved.",
    explanation: "Nearly every AI system in use today — recommendation engines, voice assistants, spam filters — is Narrow AI, designed for a single task. AGI remains an active research goal, not a reality."
  },
  {
    id: "aiv-5", topic: "AI vs Server", difficulty: "hard", type: "text",
    question: "You want a system to turn a fan ON when the temperature crosses 30°C. Compare implementing this with a traditional IF-THEN server rule versus training an ML model on historical temperature/fan-usage data. When would you prefer each?",
    keywords: ["if", "rule", "simple", "data", "complex", "pattern", "predict"],
    correctAnswer: "A simple IF temperature > 30°C THEN fan ON rule is faster to build, fully predictable, and ideal for a clear-cut, unchanging condition. An ML model trained on historical usage data is worth it when the relationship is more complex (e.g. depends on humidity, time of day, occupancy) and you want the system to discover and adapt to patterns a human might miss.",
    explanation: "Use hand-written rules when logic is simple and fixed; use ML when the underlying pattern is too complex or variable to hand-code reliably."
  },

  /* ----------------------------- Codex ----------------------------- */
  {
    id: "cdx-1", topic: "Codex", difficulty: "easy", type: "mcq",
    question: "Which company created OpenAI Codex?",
    options: ["Google", "Anthropic", "OpenAI", "Microsoft"],
    answerIndex: 2,
    explanation: "Codex was introduced by OpenAI in August 2021, built on the GPT-3 architecture and trained on natural language plus publicly available source code."
  },
  {
    id: "cdx-2", topic: "Codex", difficulty: "easy", type: "text",
    question: "In one sentence, what does OpenAI Codex do?",
    keywords: ["code", "natural language", "generat", "convert", "program"],
    correctAnswer: "Codex is an AI-powered coding assistant that converts natural language instructions into working code — generating, debugging, testing, and improving software.",
    explanation: "It works across multiple programming languages and is accessible via ChatGPT, CLI, IDEs, desktop apps, and the API."
  },
  {
    id: "cdx-3", topic: "Codex", difficulty: "intermediate", type: "mcq",
    question: "What underlying architecture was the original Codex model built on?",
    options: ["BERT", "GPT-3", "ResNet", "LSTM"],
    answerIndex: 1,
    explanation: "Codex (2021) was built on the GPT-3 architecture, later evolving into a full autonomous coding agent (codex-1 and beyond)."
  },
  {
    id: "cdx-4", topic: "Codex", difficulty: "intermediate", type: "text",
    question: "Name two concrete benefits Codex offers a development team, according to what was taught.",
    keywords: ["faster", "debug", "productiv", "test", "learn", "document", "automat"],
    correctAnswer: "Examples include: faster development (working code generated in seconds), automated debugging (finds and fixes bugs), better productivity (handles repetitive tasks), learning support (explains codebases), and software automation (tests, docs, refactoring).",
    explanation: "Codex is used to speed up coding, cut QA time through automated debugging, and free developers to focus on harder problem-solving."
  },
  {
    id: "cdx-5", topic: "Codex", difficulty: "hard", type: "mcq",
    question: "A team wants an AI system that can read their existing repo, plan a multi-step feature implementation, write the code, run the tests, fix failures, and open a pull request — with minimal hand-holding. What best matches this need?",
    options: [
      "A basic code-completion autocomplete plugin",
      "An autonomous coding agent like the Codex CLI/agent that plans, executes, and iterates in the real repo",
      "A static documentation generator",
      "A spreadsheet formula assistant"
    ],
    answerIndex: 1,
    explanation: "This describes Codex's evolution from a code-completion model into a full autonomous software engineering agent that reads real files, plans multi-step tasks, and iterates until checks pass."
  },

  /* ----------------------------- n8n ----------------------------- */
  {
    id: "n8n-1", topic: "n8n", difficulty: "easy", type: "mcq",
    question: "By default, once n8n is running locally, which URL do you open to access the editor?",
    options: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5678", "http://localhost:9000"],
    answerIndex: 2,
    explanation: "n8n's local editor runs at http://localhost:5678 by default."
  },
  {
    id: "n8n-2", topic: "n8n", difficulty: "easy", type: "text",
    question: "In your own words, what is a 'node' in n8n?",
    keywords: ["step", "action", "block", "workflow", "task"],
    correctAnswer: "A node is a single building block/step in an n8n workflow that receives data, does something with it (trigger, transform, or act), and passes the result to the next node.",
    explanation: "Nodes fall into four categories: Trigger, Action, Logic, and AI nodes — chained together to form a workflow."
  },
  {
    id: "n8n-3", topic: "n8n", difficulty: "intermediate", type: "mcq",
    question: "What data format does n8n use to pass information between nodes?",
    options: ["XML", "JSON", "CSV", "YAML"],
    answerIndex: 1,
    explanation: "Almost everything inside n8n is JSON (JavaScript Object Notation) — a structured key-value format carried from node to node."
  },
  {
    id: "n8n-4", topic: "n8n", difficulty: "intermediate", type: "text",
    question: "What is an 'expression' in n8n, and give a simple example.",
    keywords: ["previous node", "data", "{{", "json", "value"],
    correctAnswer: "An expression lets you use a previous node's data directly inside a workflow without writing code, e.g. {{$json.name}} inserts the 'name' value from the incoming JSON.",
    explanation: "Example: Hello {{$json.name}} → outputs 'Hello Retro' when the incoming JSON has \"name\": \"Retro\"."
  },
  {
    id: "n8n-5", topic: "n8n", difficulty: "hard", type: "text",
    question: "You want a workflow where an external app calls a URL to submit a name/email/message, the data is prepared, an email is sent via Gmail, and a response is returned to the caller. Name the sequence of node types you'd use.",
    keywords: ["webhook", "set", "edit fields", "gmail", "respond"],
    correctAnswer: "Webhook (trigger, receives the request) → Edit Fields/Set (prepares/shapes the data) → Gmail (sends the email) → Respond to Webhook (returns the result to the caller).",
    explanation: "This mirrors the classic beginner n8n project: Webhook → Set Data → Gmail → Response."
  }

];
