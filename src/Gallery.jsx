import React, {useState, useEffect} from 'react';

function Gallery() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    const notInterested = (id)=> { // establishing not interested button/removing the tour
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)) 
    };

    const toggleExpanded = (id)=> { // shows the expanded tour
        setTours((prevTours)=> prevTours.map((tour)=> tour.id === id ? {...tour, expanded: !tour.expanded}:tour ));
    };


    useEffect(() => { // use effect to show list of tours
        setLoading(true);
        fetch('https://www.course-api.com/react-tours-project') // loads tours from api
        .then(response => response.json()) 
        .then(data => {
            setTours(data.map((tour) => ({...tour, expanded: false})));// adding the tours in with map
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an Error Retreiving the Tours', error);// error message if the fetch fails
            setLoading(false);
        });
    }, []);

    if (loading){ 
        return <div>Loading Available Tours</div> // loading message while fetching data
    }
    return (
        <div>
            <h1> Tours Available:</h1>
            <ul>
                {tours.map(tour=>(
                    <li key={tour.id}>
                        {tour.name}- ${tour.price}
                        <br></br> 
                        <button onClick ={()=> toggleExpanded(tour.id)}>{tour.expanded ?'Show Less':'Read More'} </button>
                        {tour.expanded && ( // show more and show less buttons, and not interested button
                            <>
                            <p>{tour.info}</p>
                            <img src={tour.image}></img> 
                            </>
                        )}
                        <br></br>
                        <button onClick={()=> notInterested(tour.id)}>Not Interested</button> 
                        <p></p>
                    </li>

                ))}
            </ul>
        </div>
    )
}
export default Gallery;