import React from 'react';
import './Video.css';

const VideoPlayer=({videos}) =>{
    const getEmbedUrl = (url)=>{
        if(url.includes('youtube.com') || url.includes('youtu.be')){
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };
    return(
        <div className="video-section">
            {videos.map((video)=>(
                <div key={video._id} className="video-card">
                    <h4>{video.title}</h4>
                    <div className='video-wrapper'>
                        <iframe 
                        src={getEmbedUrl(video.url)}
                        title={video.title}
                        frameBorder="0"
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        ></iframe>
                    </div>
                    <p>{video.description}</p>
                    <small>Source:{video.source}| Duration:{video.duration}</small>
                    
                </div>
            ))}
            
        </div>
    );
};

export default VideoPlayer;