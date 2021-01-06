// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,
    mutate () {
      const randomIndex = Math.floor(Math.random() * 15);
      const control = this.dna[randomIndex];
      while (this.dna[randomIndex] === control) {
        this.dna[randomIndex] = returnRandBase();
      }
    },
    compareDNA (obj) {
      let syncNum = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (obj.dna[i] === this.dna[i]) {
          syncNum += 1;
        }
      }
      console.log(syncNum);
      const perc = Math.ceil(syncNum / 15 * 100);
      console.log(`The specimens have a ${perc}% compatibility`);
    },
    willLikelySurvive () {
      let strongBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          strongBases += 1;
        }
      }
      const perc = strongBases / 15;
      if (perc >= .6) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const generateSurvivors = howMany => {
  const survivorArray = [];
  let i = 0;
  while (survivorArray.length < 30) {
    i++;
    let tempOrg = pAequorFactory(i, mockUpStrand());
    if (tempOrg.willLikelySurvive() === true) {
      survivorArray.push(tempOrg);
    }
  }
  return survivorArray;
}

const alphaSpecies = generateSurvivors(30);
console.log(alphaSpecies);