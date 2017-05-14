var observer = new IntersectionObserver(function(entries){

    console.log(entries);

},{

})

var items = document.querySelectorAll('.section');

/*items.forEach = String.prototype.forEach();

items.forEach(function(item){

    observer.observe(item);

})*/