/**
 * 吐字特效
 * author by laynce  2023-6-8
 */
import type{ ComponentPublicInstance, Ref} from 'vue'
const sleep = async (time: number) => await new Promise((resolve) => setTimeout(resolve, time))

interface resResult {
  [index: string]: string | boolean | Record<string, any>
}

const initState: Record<string, any> = {
  vm: null,
  contents: [],
  startNum:  0,
  timer: null,
  isFinish: false,
  endFlag: false,
}

export class WordSingle {
  operateObj:  Ref<string | null> // operateObj--需要改变页面显示的内容的对象
  state: Record<string, any>

  constructor(vm: ComponentPublicInstance | undefined | null, operateObj: any) {
    this.state = Object.assign({}, initState, { vm, contents: []})
    this.operateObj = operateObj  
    this.init()
  } 

  async init() {
    await this.getAnswer() 

    if (this.state.isFinish) {
      // 一开始接口无内容返回，则无数据
    } else {
      this.popChar() 
    }
  }

  async getAnswer() {

    await sleep(2000)  // 模拟调接口查询内容

    const { startNum } = this.state
    
    let res: resResult = {
      data: {
        content: '12341242143\n12341242143\n' + Math.random() * 100000000 + Math.random() * 100000000,
        endFlag: startNum > 20 // 接口返回的是否查询结束的标识, 此处为了模拟暂停接口
      }
    }

    const { data: {content, endFlag} }: Record<string, any> = res || {}

    this.state.endFlag = endFlag

    if (content) {
      this.makeContent(content)
    } else {

      const { contents } = this.state

      if (!contents.length) {
        this.state.isFinish = true
        this.state.endFlag = true
      } 
    }
  }

  makeContent(con: string) {
    if (con) {
      const val = con.slice(this.state.startNum, con.length)

      for (let i = 0; i < val.length; i++) {
        val[i] && this.state.contents.push(val[i])
      }

      this.state.startNum = con.length // 根据业务自己变，目前这样是接口下次返回的内容包含之前的内容
    }
  }

  popChar() {
    this.state.timer = setInterval(() => {
      const {contents, endFlag} = this.state
      if (contents.length) {
        let str = this.state.contents.shift()
        this.operateObj.value += (str === '\n' ? '<br/>': str)
      } else {
        if (endFlag) {
          this.clear()
          this.state.isFinish = true
        }
      }

    }, 100);

    this.reLoadAnswer()
  }

  async reLoadAnswer() {
    if (!this.state.endFlag) {
      await this.getAnswer()
      await sleep(300)
      this.reLoadAnswer()
    }
  }

  clear() {
    clearInterval(this.state.timer)
  }
}
