export class Yard {
    private animals: any[] = []
    private feed: any[] = []
    private maxCount: number = 3
    private health: number = 100

    get newAnimals(){
        return [...this.animals]
    }

    constructor(){
        this.init()
    }

    private init(){
        // TODO
        // this.animals.push(new Pig())
        // this.animals.push(new Cow())
    }
    addAnimal(animal: Animals){
        if(this.animals.length <= this.maxCount){
            switch(animal){
                case Animals.COW:
                    this.animals.push(new Cow())
                    break
                case Animals.PIG:
                    this.animals.push(new Pig())
                    break
            }
        }
    }
    addFeed(feed: any){}
    dilapidation(){} // обветшание
    feeding(){}
    growingUp(){} // взросление
    killAnimal(idAnimal: number){}
}

export enum Animals {
    ANIMAL,
    PIG,
    COW
}

export class Animal {
    protected health: number = 0
    readonly type: Animals = Animals.ANIMAL
    protected satiety: number = 0
    protected prey: any = 0
    protected age: number = 0
    protected readonly maxAge: number = 0
}

class Pig extends Animal {
    readonly type: Animals = Animals.PIG
    protected health: number = 100
    protected readonly maxAge: number = 5
}
class Cow extends Animal {
    readonly type: Animals = Animals.COW
    protected health: number = 100
    protected readonly maxAge: number = 10
}

class Prey {}
class Milk extends Prey {}
class Meat extends Prey {}
class Poop extends Prey {}
class Leather extends Prey {}
class Blood extends Prey {}