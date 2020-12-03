import React from 'react'
import InputField from '../InputfieldComp'
import ButtonComp from '../ButtonComp'
import './ArtiEditSect.css'
import Icon from '../userimg.png'

function ArtiEditSect() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    return (
        <div className='containerArtiEdit'>
            <img src={Icon} alt='icon' className='icon'/>
        <h1 className='title'>
            Título
        </h1>
        <InputField 
            type='text'
            placeholder='Titulo'
            value={''}
            onChange={(e) => {
                setTitle(e.target.value);
            }}
        />
        <h1 className='content'>
            Contenido
        </h1>
        <InputField 
            type='text'
            placeholder='Contenido'
            value={''}
            onChange={(e) => {
                setContent(e.target.value);
            }}
        />
        <h1 className='extras'>
            Extras
        </h1>
        <ButtonComp 
                text={'Seleccionar Archivo'}
                disabled={false}
              //  onClick={selectArc}
             />
         <ButtonComp 
                text={'Pegar un link'}
                disabled={false}
              //  onClick={link}
             />
        </div>
    )
}
export default ArtiEditSect