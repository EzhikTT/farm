export class Yard {
    private animals: any[] = []
    private feed: any[] = []
    private maxCount: number = 3
    private health: number = 100
    private preyes: Prey[] = []

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
    growingUp(){// взросление
        for(const animal of this.animals){
            animal.growingUp()
        }
        this.removeDeadAnimals()
    } 
    killAnimal(idAnimal: number){}
    getHungry(){
        for(const animal of this.animals){
            animal.getHungry()
        }
        this.removeDeadAnimals()
    }
    private removeDeadAnimals(){
        for(let i = 0; i < this.animals.length; i++){
            if(this.animals[i].isDead()){
                this.preyes.push(...this.animals[i].prey)
                this.animals.splice(i, 1)
                i--
            }
        }
    }
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
    protected _prey: Prey[] = []
    protected age: number = 0
    protected readonly maxAge: number = 0
    readonly eatTypes: any[] = []

    get prey(){
        return this._prey
    }

    getHungry(){
        if(this.health > 0){
            this.health -= 10
        }
    }
    growingUp(){
        if(this.age < this.maxAge){
            this.age++
        }
    }
    isDead(){
        return this.health <= 0 || this.age >= this.maxAge
    }
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

class Food {}
class Grass extends Food {}