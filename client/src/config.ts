interface Config {
  api: {
    url: string
  }
}
const defaultConfig: Config = {
  api: {
    url: ''
  }
}

let config: Config

switch(import.meta.env.MODE) {
  case 'development': {
    config = {
      ...defaultConfig,
      api: {
        ...defaultConfig.api,
        url: 'http://localhost:8000'
      }
    }
    break
  } 
  default: {
    config = {
      ...defaultConfig,
      api: {
        ...defaultConfig.api,
        url: 'https://cooper-gpt.cooperwalter.repl.co'
      }
    }
  }
}

export default config