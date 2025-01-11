import CellVegetable, { Potato } from "./Cell"

export default class FieldVegetables {
    private cells: CellVegetable[] = []

    get field() {
        return [...this.cells]
    }

    constructor(size: number){
        this.createField(size)
    }

    private createField(size: number){
        for(let i = 0; i < size; i++){
            this.cells.push(new CellVegetable())
        }
    }

    seed(type: string, index: number){
        this.cells[index] = new Potato()
    }
}

const c = new FieldVegetables(10)

// c.createField()