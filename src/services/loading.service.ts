import { ref } from 'vue'

const phrases = [
  'Preparando a experiência...',
  'Carregando o conteúdo do site...',
  'Organizando informações...',
  'Quase pronto...'
]

class LoadingService {
  public isLoading = ref(true)
  public currentMessage = ref(phrases[0])
  public progress = ref<number | null>(null)

  private messageInterval: any = null
  private startTime = Date.now()
  private minDisplayTimeMs = 600

  constructor() {
    this.startMessageRotation()
  }

  public startLoading(initialMessage?: string) {
    this.startTime = Date.now()
    this.isLoading.value = true
    this.currentMessage.value = initialMessage || phrases[0]
    this.progress.value = null
    this.startMessageRotation()
  }

  public setProgress(value: number) {
    this.progress.value = Math.min(100, Math.max(0, value))
  }

  public setMessage(msg: string) {
    this.currentMessage.value = msg
  }

  public async stopLoading(): Promise<void> {
    const elapsed = Date.now() - this.startTime
    const remaining = Math.max(0, this.minDisplayTimeMs - elapsed)

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining))
    }

    this.isLoading.value = false
    this.stopMessageRotation()
  }

  private startMessageRotation() {
    this.stopMessageRotation()
    let index = 0
    this.messageInterval = setInterval(() => {
      index = (index + 1) % phrases.length
      this.currentMessage.value = phrases[index]
    }, 2800)
  }

  private stopMessageRotation() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval)
      this.messageInterval = null
    }
  }
}

export const loadingService = new LoadingService()
