  import TextType from './TextType';
  import './TextOverlay.css';

  export default function TextOverlay() {
    return (
      <div className='text-overlay'>
        <TextType
          text={["Hey young explorer","Ready to launch...!"]}
          typingSpeed={75}
          pauseDuration={1000}
          deletingSpeed={50}
          showCursor={true}
          cursorCharacter="|"
          textColors={["white"]}   
        />
      </div>
    );
  }
