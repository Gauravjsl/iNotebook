
import Note from './Notes'




export default function Home(props) {
  const {showAlert} = props;
  return (
    <>
    <div>
      <Note showAlert={showAlert}/>
    </div>
    
    </>
  )
}
