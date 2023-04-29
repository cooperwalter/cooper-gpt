interface Message {
  role: string
  content: string
}

interface Choice {
  finish_reason: string
  index: number
  message: Message
}

interface Usage {
  completion_tokens: number
  prompt_tokens: number
  total_tokens: number
}

interface CompletionResponse {
  id: string
  created ?: number
  model: string
  object: string
  choices: Choice[]
  usage: Usage
}

export {
  Message,
  Choice,
  Usage,
  CompletionResponse
}