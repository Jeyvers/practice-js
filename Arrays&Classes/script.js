
const companies = [
    {name: "Company One", 
    category: "Finance", 
    start: 1981, 
    end: 2003},
    {name: "Company Two", 
    category: "Retail", 
    start: 1992, 
    end: 2008}
];

console.log(typeof companies)
companies.forEach(
    (company, index) => console.log(index)
);

companies.forEach(
    (company, index) => {
        if(index == 0){
            console.log(company.name)
    };
}
);

class Companies {
    constructor(name, category, start, end) {
        this.name = name;
        this.category = category;
        this.start = start;
        this.end = end;
    }
   

};

const company1 = new Companies ('Company One', 'Retail', 1986, 2016);

console.log(typeof company1);

// So Arrays are objects, and classes are objects? 