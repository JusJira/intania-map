import Sheet from 'react-modal-sheet';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import './Buildinginfo.css';
import axios from 'axios';
import BuildingCard from './BuildingCard';
import {Button} from '@mui/material'

function BuildingInfo() {
    const [info, setInfo] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [image, setImage] = useState(true);
    const [img, setImg] = useState()

    useEffect(() => {
        var url = 'https://api.jjus.dev/building/' + name
        axios.get(url).then(function (response) {
            setInfo(response)
            console.log(response.data);
            setOpen(true)
        })
    }, [])

    const handleImage = (index) => {
        if (index == 0) {
            setImage(false);
        }
        if (index == 1) {
            setImage(true);
        }
    }
    const handleClose = () => {
        setOpen(false)
        setTimeout(() => navigate('/'), 200)
    }

    const handleNavigate = (info) => {
        var lat = info['Lat']
        var long = info['Long']
        console.log(lat)
        console.log(long)
        let url = 'http://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.3020'
        let url2 = 'http://maps.google.com/maps?z=12&t=m&q=loc:' + lat + '+' + long
        window.open(url2)
    }

    let Id = useParams();
    var name = Id.Id
    let navigate = useNavigate();
    var imgurl = '/images/' + name +'.png'
    

    if (!info) return null;

    return (
        <>

            <Sheet isOpen={isOpen} onClose={handleClose}
                snapPoints={[0.8, 0.4]}
                initialSnap={1}
                onSnap={(snapIndex) => { handleImage(snapIndex) }}>
                <Sheet.Container>
                    <Sheet.Header>
                        {image ? <div className='building-image-box-wrapper'>
                            <div className='building-image-box'>
                                <img src={imgurl}/>
                            </div>
                        </div> : <></>}
                    </Sheet.Header>

                    <Sheet.Content>
                        {image ? <></> :
                            <div className='building-image-box-inline'>
                                <img src={imgurl} />
                            </div>}
                        <div className='building-data'>
                            <BuildingCard name='Department' info={info.data['Department']}/>
                            <BuildingCard name='Direction' info={info.data['Direction']}/>
                            <BuildingCard name='Essential' info={info.data['Essential']}/>
                            <BuildingCard name='Facility' info={info.data['Facility']}/>
                        </div>
                        <div className='building-button-navigate'><Button variant="contained" onClick={() => {handleNavigate(info.data)}}>Navigate</Button></div>
                    </Sheet.Content>
                </Sheet.Container>

                <Sheet.Backdrop onClick={handleClose} />
            </Sheet>
        </>
    );
}

export default BuildingInfo