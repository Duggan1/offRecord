import React, { useState } from "react";
import './App.css';

function Joey() {
    const colorSong = {
        'Reading': [
            'red',
            'https://www.youtube.com/embed/kKnwrCQwIvo',
            'https://www.youtube.com/embed/ayUwaT9fPjQ',
            'https://www.youtube.com/embed/kaONGZXpTuU'
        ],
        'Science': [
            'blue',
            'https://www.youtube.com/embed/k3rRrl9J2F4',
            'https://www.youtube.com/embed/W_SMypXo7tc',
            'https://www.youtube.com/embed/t3XiCRluNpM'
        ],
        'Math': [
            'green',
            'https://www.youtube.com/embed/x8CpolFriLw',
            'https://www.youtube.com/embed/_jBRiZ7z1RA',
            'https://www.youtube.com/embed/D9kZfJWQHJo'
        ],
        'Social Studies': [
            'purple',
            'https://www.youtube.com/embed/zeM5ewySceQ',
            'https://www.youtube.com/embed/Hmjhcsq-qMQ',
            'https://www.youtube.com/embed/XINLtbiRCcw'
        ],
    }

    const [selectedCategory, setSelectedCategory] = useState('Reading');
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedVideoIndex(null);
    }

    const handleVideoToggle = (index) => {
        setSelectedVideoIndex(index === selectedVideoIndex ? null : index);
    }

    return (
        <div className="joey">
            <h1 style={{ marginTop: '0%' }}>Videos for Studying! </h1>
            <h2>Select your Subject</h2>
            <select id='Svideo' style={{ width: '50%', marginBottom: '5%', color: 'white', backgroundColor: `${colorSong[selectedCategory][0]}` }} value={selectedCategory} onChange={handleCategoryChange}>
                {Object.keys(colorSong).map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <br></br>
            <h2>Click your Video</h2>
            {colorSong[selectedCategory].slice(1).map((videoUrl, index) => (
                <div  key={index}>
                    <center><h4
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '35%',
                            width: '400px',
                            maxWidth: '35%',
                            height: '60px',
                            fontSize: '25px',
                            backgroundColor: `black`,
                            color: 'white',
                            border: `${colorSong[selectedCategory][0]} 21px solid`,
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleVideoToggle(index)}
                    >
                        {selectedCategory} Video #{index + 1}
                    </h4></center>
                    {selectedVideoIndex === index && (
                        <iframe
                            allow="fullscreen"
                            style={{
                                borderRadius: '35%',
                                width: '400px',
                                maxWidth: '65%',
                                height: '240px',
                                border: `${colorSong[selectedCategory][0]} 21px dotted`,
                                marginBottom: '100px'
                            }}
                            width="560"
                            height="315"
                            src={videoUrl}
                            frameBorder="0"
                        ></iframe>
                    )}
                </div>
            ))}
            <h2  style={{backgroundColor:'white', color:'black', borderTop:'5px black solid',fontSize:'bold', borderBottom:'5px black solid',fontSize:'35px'}}>Benefits of Online learning </h2>
            <p style={{ lineHeight: '2.2', textAlign: 'justify', padding: '20px', margin: '0 auto', width: '80%'}}>Online learning and working with a tutor have emerged as powerful tools that can significantly enhance students' educational experiences and contribute to their overall personal and academic growth. These methods of learning offer a range of benefits that can positively impact students' lives, providing opportunities for personalized instruction, flexibility, and access to a diverse range of resources.

One of the key advantages of online learning is its flexibility. Students are no longer confined by geographical limitations and rigid schedules. They can access educational content from the comfort of their homes, allowing them to tailor their learning experiences to their own pace and preferences. This flexibility is particularly beneficial for students with busy schedules or other commitments, such as part-time jobs or extracurricular activities. It enables them to strike a balance between their academic pursuits and other responsibilities, fostering a healthier work-life balance.

Working with an online tutor, in particular, offers personalized attention that can make a substantial difference in a student's learning journey. Tutors are able to cater their instruction to each student's unique learning style, strengths, and areas of improvement. This personalized approach ensures that students receive targeted support in subjects or concepts they find challenging, allowing them to overcome obstacles and build a stronger foundation of knowledge. The one-on-one interaction between tutor and student fosters a supportive environment in which questions can be asked without hesitation, leading to deeper understanding and confidence.

Furthermore, online platforms often provide a wealth of resources that can supplement traditional learning methods. From interactive quizzes and multimedia presentations to virtual labs and simulations, these resources engage students in active learning and make complex concepts more accessible. Online learning environments also promote digital literacy, a skill that is increasingly important in today's technology-driven world. Students become adept at navigating digital interfaces, collaborating online, and conducting research efficiently—skills that are applicable to both their academic and professional pursuits.

Incorporating online learning and tutoring into a student's routine can have a transformative impact on their academic success and personal development. It empowers students to take control of their learning, fostering a sense of responsibility and independence. As they navigate the online landscape, they also develop essential skills such as time management, self-discipline, and adaptability—skills that will serve them well throughout their lives. Overall, the combination of online learning and tutoring has the potential to not only improve academic performance but also instill a lifelong love for learning and a deeper understanding of the world around them.</p>
            <iframe
            allow="fullscreen"
            style={{

                maxWidth: '90%',
                height: '440px',
                
            }}
            width="660"
            height="315"
            src='https://www.youtube.com/embed/VJbKXmujI00'
            frameBorder="0"
        ></iframe>
        </div>
    )
}

export default Joey;
