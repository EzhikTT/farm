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
}

export class Tomato extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.TOMATO
    readonly expired: number = 3
}
export class Potato extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.POTATO
    readonly expired: number = 5
}
export class Cucumber extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.CUCUMBER
    readonly expired: number = 7
}
export class Carrot extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.CARROT
    readonly expired: number = 2
}

export class BlockCell extends CellVegetable {
    readonly type: TypeVegetables = TypeVegetables.BLOCK
}