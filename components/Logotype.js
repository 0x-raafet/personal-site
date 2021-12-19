import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/display-name
const Logotype = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}>
    <Container version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="m15.868 44.702q-0.03418-0.41699 0.054688-0.72461t0.35547-0.50586 0.85449-0.19824h2.2012q0.45117 0 1.1826 0.047852t1.5723 0.14355 1.6748 0.29395 1.5244 0.49219 1.1211 0.72461 0.43066 1.0186q0 0.83398-0.48535 1.5654t-1.2168 1.3193-1.5449 1.0459-1.4561 0.82715q2.543 0.56055 3.9785 2.3242t1.4355 4.4023q0 1.3945-0.5332 2.7549t-1.4561 2.4541-2.1875 1.7637-2.7139 0.66992q-0.19141 0-0.43066-0.041016t-0.4375-0.12988-0.3418-0.25293-0.14355-0.42383q0-1.2031 1.2988-1.2031 0.21875 0 0.5127 0.061523t0.45801 0.25293q0.75195-0.31445 1.374-0.99805t1.0527-1.5244 0.66992-1.7637 0.23926-1.6748q0-0.90234-0.2666-1.8389t-0.77246-1.7363-1.2441-1.3467-1.6953-0.68359q-0.24609-0.027344-0.54004-0.041016l-0.58789-0.027344t-0.57422-0.082031-0.48535-0.21875q0.10938 2.2695 0.28027 4.5254t0.45801 4.5254q0.10938 0.10938 0.15039 0.32129t0.068359 0.45117 0.027344 0.45801v0.36914q0 0.24609-0.16406 0.40332t-0.38965 0.25293-0.47852 0.12305-0.44434 0.027344q-0.61523 0-0.94336-0.16406t-0.46484-0.47852-0.17773-0.71777-0.068359-0.88184q-0.36914-3.8145-0.5332-7.5469t-0.16406-7.5469q0-0.45117-0.03418-0.86816zm2.5225-0.58105q0 1.6816 0.10938 3.3701t0.19141 3.3701q0.61523-0.36914 1.6133-0.86816t1.9346-1.1006 1.6064-1.3262 0.66992-1.5723q0-0.66992-0.79297-1.0186t-1.8457-0.51953-2.0576-0.21191-1.4287-0.12305zm11.945 14.779q0-0.92969 0.25293-1.791t0.75879-1.5381 1.2646-1.0801 1.7568-0.40332q0.61523 0 1.3604 0.18457t1.4014 0.54688 1.0938 0.92285 0.4375 1.2852q0 0.3418-0.11621 0.51953t-0.47168 0.17773l-0.15039-0.027344q0.39648 1.0664 0.68359 2.1875t0.56055 2.2422q0.10938 0.21875 0.16406 0.38965t0.054688 0.33496q0 0.21875-0.12305 0.3623t-0.32129 0.21191-0.41016 0.095703-0.37598 0.027344q-0.58789 0-0.88184-0.20508t-0.42383-0.56055-0.15723-0.7998-0.10938-0.89551q-0.16406 0.5332-0.43066 1.0391t-0.62891 0.90918-0.85449 0.64258-1.1074 0.23926q-0.90234 0-1.5176-0.51953t-0.99121-1.2783-0.54688-1.6201-0.1709-1.5996zm1.9414-0.19141q0 0.50586 0.068359 1.0664t0.22559 1.1074 0.40332 1.0322 0.61523 0.85449q0.66992-0.72461 0.99121-1.7637t0.57422-2.0029 0.57422-1.6543 0.99121-0.69043q0.42383 0 0.71094 0.15039-0.13672-0.3418-0.45117-0.66309t-0.7041-0.58789-0.80664-0.4375-0.78613-0.1709q-0.10938 0-0.25293 0.03418t-0.22559 0.0068359q-0.56055 0.16406-0.92285 0.56738t-0.58789 0.9502-0.32129 1.1211-0.095703 1.0801zm9.9076-3.6367q0-0.56055 0.19824-0.94336t0.84082-0.38281q0.24609 0 0.61523 0.075195t0.42383 0.37598q0.13672 0.80664 0.15039 1.75t0.095703 1.7773q0.31445-0.61523 0.80664-1.3262t1.1211-1.3125 1.3672-0.99805 1.5039-0.39648q0.054688 0 0.20508 0.041016t0.28027 0.11621 0.15723 0.1709-0.15039 0.17773q-0.054688 0.16406-0.23242 0.19824t-0.31445 0.03418q-0.082031 0-0.25977-0.068359-1.0117 0.5332-1.7227 1.4492t-1.1621 2.0303-0.65625 2.3516-0.20508 2.4131q0 0.58789-0.2666 0.71094t-0.85449 0.12305q-0.31445 0-0.66309-0.068359t-0.48535-0.4375q-0.24609-0.7793-0.40332-1.791t-0.23926-2.085-0.11621-2.1123-0.03418-1.873zm9.1556-4.8535q0-0.19141 0.41016-0.32812t0.92969-0.22559 1.0049-0.12988 0.66309-0.068359q0-0.36914 0.027344-0.74512t0.15039-0.66992 0.38965-0.47168 0.74512-0.17773q0.39648 0 0.60156 0.095703t0.4375 0.39648q0.054688 0.16406 0.054688 0.31445v0.45801t-0.027344 0.47168q0.50586-0.054688 1.0049-0.12988t1.0049-0.075195q0.36914 0 0.50586 0.013672t0.27344 0.32812q0.10938 0.31445-0.2666 0.47852t-0.90234 0.24609-1.0459 0.12305-0.62891 0.041016q-0.16406 2.3516-0.33496 4.6621t-0.1709 4.6895q0 1.0664 0.068359 2.2012t0.38281 2.1465q0.082031 0.31445 0.27344 0.58789t0.19141 0.58789q0 0.19141-0.15039 0.30078t-0.3623 0.18457-0.42383 0.088867-0.34863 0.013672q-0.86133 0-1.3125-0.64258t-0.64941-1.5381-0.21191-1.8389-0.013672-1.5312q0-1.2031 0.047852-2.4609t0.11621-2.4883 0.19141-2.4062 0.28711-2.1875q-0.47852 0.054688-0.93652 0.12305t-0.93652 0.068359q-0.10938 0-0.29395-0.013672t-0.34863-0.068359-0.28027-0.15039-0.11621-0.27344z" fill="currentColor"/>
    </Container>
  </a>
))

export default Logotype

const Container = styled.svg`
  height: 105px;
  width: 70px;
`
