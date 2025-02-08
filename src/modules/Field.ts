import CellVegetable, { BlockCell, Carrot, Cucumber, Potato, Tomato, TypeVegetables } from "./Cell"

type Seeds = {
   [n: number]: number 
} // type Seeds

export default class FieldVegetables {
    private cells: CellVegetable[] = []

    // [].map((i) => {
    //     const t = 0

    //     return {}
    // })

    // private seeds: Seed[] = [
    //     {
    //         [TypeVegetables.BLOCK]: "some string"
    //     }
    // ]

    private _seeds: Seeds = {
        [TypeVegetables.EMPTY]: 2,
        [TypeVegetables.CARROT]: 4,
        [TypeVegetables.TOMATO]: 5,
        [TypeVegetables.POTATO]: 1,
        [TypeVegetables.CUCUMBER]: 8,
    }

    get seeds() {
        return this._seeds
    }

    get field() {
        return [...this.cells]
    }

    constructor(size: number){
        this.createField(size)
    }

    private createField(size: number){
        for(let i = 0; i < size; i++){
            if(i % (size / 2) > (size / 2 / 2 - 1)){ // i % 8 > 4
                this.cells.push(new BlockCell())
            }
            else {
                this.cells.push(new CellVegetable())
            }
        }
    }

    seed(type: TypeVegetables, index: number){
        if(
            this.cells[index] && 
            (
                this.cells[index].type === TypeVegetables.EMPTY || 
                this.cells[index].type === TypeVegetables.BLOCK
            )
        ){
            if(
                type && 
                type !== TypeVegetables.BLOCK && 
                this.cells[index].type !== TypeVegetables.BLOCK
            ){
                if(this._seeds[type] > 0){
                    switch(type){
                        case TypeVegetables.TOMATO:
                            this.cells[index] = new Tomato()
                            break;
                        case TypeVegetables.POTATO:
                            this.cells[index] = new Potato()
                            break;
                        case TypeVegetables.CUCUMBER:
                            this.cells[index] = new Cucumber()
                            break;
                        case TypeVegetables.CARROT:
                            this.cells[index] = new Carrot()
                            break;
                    } 
                    this._seeds[type]--
                }
            }
            else if(
                (
                    type === undefined ||
                    type === TypeVegetables.BLOCK
                ) && 
                this.cells[index].type === TypeVegetables.BLOCK
            ){
                this.cells[index] = new CellVegetable()
            }
        }
    }
}

// const c = new FieldVegetables(10)

// c.createField()