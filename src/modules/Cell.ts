export enum TypeVegetables {
    EMPTY,
    TOMATO,
    POTATO,
    CUCUMBER,
    CARROT,
    BLOCK
}

export default class CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.EMPTY
    readonly expired: number = 0
    protected stage: number = 0
    protected readonly stages: number[] = []
    protected readonly _color: number[] = [255, 255, 255]

    get color(){
        let alpha = 1
        if(this.stages.length === 0){}
        else{
            const step = alpha / this.stages.length
            alpha = 0
            for(const stage of this.stages){
                if(this.stage >= stage){
                    alpha += step
                }
            }
        }
        return `rgba(${this._color.join(',')}, ${alpha})`
    }

    get currentStage() {
        let currentStage = this.stage // 200
        // [100, 200, 400, 600]
        for(const stage of this.stages){
            // console.log(currentStage, stage, this.stage)
            if(this.stage > stage){
                currentStage = stage
            }
            if(stage === this.stage){
                return stage
            }
        }
        // console.log("\n")
        return currentStage
    }

    incStage(){

        // console.log("incStage")

        // [100, 200].join(',') // 100,200

        if(
            this.stages.length > 0 && 
            this.stages[this.stages.length - 1] > this.stage
        ){
            this.stage += 100

            // console.log(this.stage)
        }
    }
}

export class Tomato extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.TOMATO
    readonly expired: number = 3
    protected readonly stages: number[] = [100, 300, 600]
    protected readonly _color: number[] = [255, 0, 0]
}
export class Potato extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.POTATO
    readonly expired: number = 5
    protected readonly stages: number[] = [100, 200, 400, 600]
}
export class Cucumber extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.CUCUMBER
    readonly expired: number = 7
    protected readonly stages: number[] = [100, 400]
}
export class Carrot extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.CARROT
    readonly expired: number = 2
    protected readonly stages: number[] = [100, 300]
}

export class BlockCell extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.BLOCK
    protected readonly _color: number[] = [0, 0, 0]
}