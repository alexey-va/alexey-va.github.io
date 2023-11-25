import {Component} from 'react'



export class Calc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "0",
            exp: [],
            rad: "Rad",
            ch: false
        }
    }

    switchRad = () => {
        this.setState({
            rad: this.state.rad === "Rad" ? "Deg" : "Rad"
        })
    }

    setRes = (res) => {
        this.setState({
            result: res
        })
    }

    addExp = (res) => {

        this.setState({
            exp: [
                ...this.state.exp, res
            ]
        })
    }

    setExp = (res) =>{
        this.setState({
            exp: res
        })
    }

    delExp = () => {
        let copy = [...this.state.exp]
        this.setState({
            exp: copy.slice(0, -1)
        })
    }

    setChange = (res) => {
        this.setState({
            ch: res
        })
    }

    fetchResult = (exp) => {
        let expression = exp.join("")
        let value = `http://localhost:8080/make?expression=${encodeURIComponent(`${expression}`)
            .replace('%20', '+')}`
        console.log(value)
        console.log(expression)
        fetch(value)
            .then((res) =>
                res.text().then((data) => this.setRes(data)))
    }

    changeExp = (id) => {
        if(id !== "") this.setChange(true)
        console.log(this.state.ch)
        switch (id){
            case "c":
                this.setExp([])
                this.setRes("0")
                break
            case "=":
                if(this.state.ch){
                    this.fetchResult(this.state.exp);
                    if(!this.state.exp.includes("rand()")) this.setChange(false)
                } else{
                    this.setExp(this.state.result)
                }
                break;
            case "del":
                this.delExp()
                break;
            case "rad":
                this.switchRad()
                break;
            default:
                this.addExp(id)
        }
    }

    funcButton = (props) => {
        return <>
            <button className="hover:opacity-100 transition-all duration-150 ease-in-out
             bg-[#474747] opacity-90 border-r border-b border-[#333333] aspect-[1/0.9]"
                onClick={() => this.changeExp(props.id)}
            >
                {props.name}
            </button>
        </>
    }

    opButtonDel = (props) => {
        return <>
            <button className="text-[1.1rem] font-extralight hover:opacity-100 transition-all duration-150 ease-in-out
             opacity-90 bg-[#474747] border-r border-b border-[#474747] aspect-[1/0.9]"
                    onClick={() => this.changeExp(props.id)}>
                {props.name}
            </button>
        </>
    }

    opButton = (props) => {
        return <>
            <button className="text-[1.5rem] hover:opacity-100 transition-all duration-150 ease-in-out bg-[#656565] opacity-90
             border-r border-b border-[#333333] aspect-[1/0.9]"
                    onClick={() => this.changeExp(props.id)}>
                {props.name}
            </button>
        </>
    }

    opButtonDot = (props ) => {
        return <>
            <button className="text-[1.5rem] hover:opacity-100 transition-all duration-150 ease-in-out bg-[#656565] opacity-90
             border-r border-b border-[#333333] aspect-[1/0.9] "
                    onClick={() => this.changeExp(props.id)}>
                <div className="-translate-y-1">
                    {props.name}
                </div>
            </button>
        </>
    }

    spaceButton = (props) => {
        return <>
            <button className="text-[1.5rem] hover:opacity-100 transition-all duration-150 ease-in-out col-span-2 bg-[#656565] opacity-90
             border-r border-b border-[#333333] aspect-[2/0.9] text-left px-5"
                    onClick={() => this.changeExp(props.id)}>
                {props.name}
            </button>
        </>
    }

    redButton = (props) => {
        return <>
            <button className=" text-[1.7rem] hover:opacity-100 transition-all duration-150 ease-in-out bg-[#FD9E2B] opacity-90
             border-r border-b border-[#333333] aspect-[1/0.9]"
                    onClick={() => this.changeExp(props.id)}>
                <div className="-translate-y-1">
                    {props.name}
                </div>
            </button>
        </>
    }

    render() {
        return <>
            <div className="bg-[#1E1F22] w-full h-screen flex justify-center items-center">

                <div className="bg-[#333333] w-3/4 max-w-lg rounded-xl shadow-2xl shadow-black flex flex-col
                 overflow-hidden text-white">
                    <div className="w-full max-sm:pb-8 max-sm:pt-4 flex text-white font-light flex-col py-2">
                        <div className="w-full flex items-end justify-end text-right px-7 pt-1 tracking-wider">
                            <div className="opacity-0">a</div>
                            {this.state.exp} <div className="pl-1">{this.state.exp?.length > 0 ? "= " : ""}</div>
                        </div>
                        <div className="flex justify-between items-end w-full -my-3">
                            <div className="max-sm:opacity-0 text-xl px-6 pb-4 opacity-70">{this.state.rad}</div>
                            <div className="opacity-0 text-[3rem] px-5">a</div>
                            <div className="text-[3rem] px-5">{this.state.result}</div>
                        </div>
                    </div>


                    <div
                        className="text-[1.1rem] font-light w-full h-full bg-gray-900 flex-row flex gap-0
                         content-start items-start">

                        <div className="grid grid-rows-5 grid-cols-6 max-sm:hidden w-[60%]">
                            {this.funcButton({name: "(", id: "("})}
                            {this.funcButton({name: ")", id: ")"})}
                            {this.funcButton({
                                name: <div>x<sup>2</sup></div>, id: "^2"
                            })}
                            {this.funcButton({
                                name: <div>x<sup>3</sup></div>, id: "^3"
                            })}
                            {this.funcButton({
                                name: <div>x<sup>y</sup></div>, id: "^"
                            })}
                            {this.funcButton({
                                name: <div>e<sup>x</sup></div>, id: "e^"
                            })}

                            {this.funcButton({
                                name: <div>10<sup>x</sup></div>, id: "10^"
                            })}
                            {this.funcButton({
                                name: <div className="w-full flex items-center flex-col text-sm">
                                    1
                                    <span className="w-1/5 bg-white h-[1px] -mb-[3px]"></span>
                                    x</div>, id: "1/"
                            })}
                            {this.funcButton({
                                name: <div>
                                    &radic;x
                                </div>, id: "sqrt("
                            })}
                            {this.funcButton({name: "ln", id: "ln("})}
                            {this.funcButton({
                                name: <div className="text-[1.0rem]">
                                    log<sub>10</sub>
                                </div>, id: "log10("
                            })}
                            {this.funcButton({name: "x!", id: "!"})}

                            {this.funcButton({name: this.state.rad === "Rad" ? "sin" : "sind",
                                id: this.state.rad === "Rad" ? "sin(" : "sind("})}
                            {this.funcButton({name: this.state.rad === "Rad" ? "cos" : "cosd",
                                id: this.state.rad === "Rad" ? "cos(" : "cosd("})}
                            {this.funcButton({name: this.state.rad === "Rad" ? "sin" : "sind",
                                id: this.state.rad === "Rad" ? "sin(" : "sind("})}
                            {this.funcButton({
                                name: <div>sin<sup>-1</sup></div>, id: "asin("
                            })}
                            {this.funcButton({
                                name: <div>cos<sup>-1</sup></div>, id: "acos("
                            })}
                            {this.funcButton({
                                name: <div>tan<sup>-1</sup></div>, id: "atan("
                            })}

                            {this.funcButton({name: "sinh", id: "sinh("})}
                            {this.funcButton({name: "cosh", id: "cosh("})}
                            {this.funcButton({
                                name: "tanh", id: "tanh("
                            })}
                            {this.funcButton({
                                name: <div>e</div>, id: "e"
                            })}
                            {this.funcButton({
                                name: <div>π</div>, id: "π"
                            })}
                            {this.funcButton({
                                name: <div>τ</div>, id: "τ"
                            })}

                            {this.funcButton({name: this.state.rad, id: "rad"})}
                            {this.funcButton({name: "max", id: "max("})}
                            {this.funcButton({name: "min", id: "min("})}
                            {this.funcButton({name: "ceil", id: "ceil("})}
                            {this.funcButton({name: "floor", id: "floor("})}
                            {this.funcButton({name: "Rand", id: "rand()"})}
                        </div>

                        <div className="grid grid-rows-5 grid-cols-4 max-sm:w-full w-[40%] h-full">
                            {this.funcButton({name: "C", id: "c"})}
                            {this.funcButton({name: ",", id: ","})}
                            {this.opButtonDel({name: "⌫", id: "del"})}
                            {this.redButton({name: "÷", id: "÷"})}

                            {this.opButton({name: "7", id: "7"})}
                            {this.opButton({name: "8", id: "8"})}
                            {this.opButton({name: "9", id: "9"})}
                            {this.redButton({name: "×", id: "×"})}

                            {this.opButton({name: "4", id: "4"})}
                            {this.opButton({name: "5", id: "5"})}
                            {this.opButton({name: "6", id: "6"})}
                            {this.redButton({name: "–", id: "-"})}

                            {this.opButton({name: "1", id: "1"})}
                            {this.opButton({name: "2", id: "2"})}
                            {this.opButton({name: "3", id: "3"})}
                            {this.redButton({name: "+", id: "+"})}

                            {this.spaceButton({name: "0", id: "0"})}
                            {this.opButtonDot({name: ".", id: "."})}
                            {this.redButton({name: "=", id: "="})}
                        </div>
                    </div>

                </div>

            </div>
        </>
    }
}
