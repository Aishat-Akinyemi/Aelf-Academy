import logo  from '../assets/img/logo.svg'

const Footer = () => {
  return (
 
        <div className='d-flex justify-content-around footer'>
            <div className="position-relative mt-3">
                <img 
                    src={logo}             
                    style={{width: "200px", height:"100px"}}              
                />
                <pre className='copyright' style={{fontSize: "xx-small"}} >
                    Copyright &copy;2022 AElf Academy.<br/>Sheng Team for LegendX Hackathon
                </pre>
            </div>
            
            <div className='d-flex flex-column'>
                <a href="https://docs.aelf.io/en/latest/" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">Developer Tools</a>
                <a href="https://discord.gg/fSehjRpc" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">Aelf Discord</a>
                <a href="https://github.com/aelfProject" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">Aelf Github</a>
            </div>
        
            <div className='d-flex flex-column'>
                <a href="https://aelf.com/develop.html" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">Aelf Developer Center</a>
                <a href="https://discord.gg/Xag6TAPcgh" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">Aelf Academy Discord</a>
                <a href="https://aelf-boilerplate-docs.readthedocs.io/en/latest/overview/setup.html" className='mt-3 footer-link' target="_blank" rel="noopener noreferrer">AelfBoilerplate Documentation</a>
               
            </div>
      
        </div>

  )
}

export default Footer
