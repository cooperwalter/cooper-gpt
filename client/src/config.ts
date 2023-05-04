const defaultConfig = {
  api: {
    url: ''
  }
}

let config

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
        url: 'https://api-coopergpt.netlify.app'
      }
    }
  }
}

export default config