const AddItemValidator = (details) => {
    const errors = {};
    const [
        { value: Name }, 
        { value: Author },
        { value: Description },
        { value: Genre },
        { value: SubGenre },
        { value: Published }, 
    ] = details;


    if(!Name.trim()){
        errors.Name = true
    }
    if(!Author.trim()){
        errors.Name = true
    }
    if(!Description.trim() || Description.length  < 5){
        errors.Name = true
    }
    
}