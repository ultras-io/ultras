export enum IconNamesEnum {
  Hearth,
  ArrowRightRound,
  ArrowRightSquare,
  ArrowRight,
  ArrowDown,
  Comments,
  Like,
  Liked,
  Check,
  Warning,
  Team,
  Badge,
  Info,
  Home,
  Search,
  Add,
}

const icons = {
  [IconNamesEnum.Hearth]: `<svg width="24" height="22" viewBox="0 0 24 22"  xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12.452 22 12.865 21.844 13.2 21.591C13.2 21.591 24 12.886 24 6.545C24 2.93 21.07 0 17.455 0C14 0 12 3 12 3V22ZM12 22C11.548 22 11.135 21.844 10.8 21.591C10.8 21.591 0 12.886 0 6.545C0 2.93 2.93 0 6.545 0C10 0 12 3 12 3" fill="rgba(255,255,255,.6)"/>
    </svg>`,
  [IconNamesEnum.ArrowRightRound]: `<svg version="1.1"  width="19.9219" height="19.9316" viewBox="0 0 19.9219 19.9316" xmlns="http://www.w3.org/2000/svg" >
    <rect height="19.9316" opacity="0" width="19.9219" x="0" y="0"/>
    <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM7.65625 14.9512Q7.42188 14.7168 7.42188 14.3994Q7.42188 14.082 7.64648 13.8672L11.7871 9.9707L7.64648 6.08398Q7.41211 5.86914 7.42188 5.54688Q7.43164 5.22461 7.66602 5Q7.88086 4.78516 8.18848 4.7998Q8.49609 4.81445 8.73047 5.03906L12.9199 8.97461Q13.2129 9.23828 13.3057 9.60449Q13.3984 9.9707 13.3057 10.3369Q13.2129 10.7031 12.9199 10.9668L8.73047 14.9121Q8.51562 15.1172 8.18359 15.127Q7.85156 15.1367 7.65625 14.9512Z" fill="rgba(255,255,255,.8)"/>
    </svg>`,
  [IconNamesEnum.ArrowRightSquare]: `<svg version="1.1" width="17.9785" height="17.998" viewBox="0 0 17.9785 17.998" xmlns="http://www.w3.org/2000/svg">
      <rect height="17.998" opacity="0" width="17.9785" x="0" y="0"/>
      <path d="M3.06641 17.998L14.9121 17.998Q16.4453 17.998 17.2119 17.2412Q17.9785 16.4844 17.9785 14.9707L17.9785 3.04688Q17.9785 1.5332 17.2119 0.776367Q16.4453 0.0195312 14.9121 0.0195312L3.06641 0.0195312Q1.5332 0.0195312 0.766602 0.776367Q0 1.5332 0 3.04688L0 14.9707Q0 16.4844 0.766602 17.2412Q1.5332 17.998 3.06641 17.998ZM14.1797 8.97461Q14.1797 9.27734 13.8867 9.57031L10.498 12.9785Q10.2832 13.1934 9.96094 13.1934Q9.64844 13.1934 9.43848 12.9785Q9.22852 12.7637 9.22852 12.4512Q9.22852 12.1289 9.46289 11.9043L10.7129 10.6738L11.9336 9.64844L9.79492 9.73633L4.57031 9.73633Q4.23828 9.73633 4.02344 9.52148Q3.80859 9.30664 3.80859 8.97461Q3.80859 8.64258 4.02344 8.42773Q4.23828 8.21289 4.57031 8.21289L9.79492 8.21289L11.9238 8.30078L10.7129 7.28516L9.46289 6.04492Q9.22852 5.80078 9.22852 5.50781Q9.22852 5.19531 9.43848 4.98535Q9.64844 4.77539 9.96094 4.77539Q10.293 4.77539 10.498 4.98047L13.8867 8.38867Q14.1797 8.68164 14.1797 8.97461Z" fill="rgba(0,0,0,0.85)"/>
    </svg>`,
  [IconNamesEnum.ArrowRight]: `<svg width="8" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.972968 11.9768C1.24137 11.9768 1.46784 11.8853 1.65237 11.7023L6.67657 6.7687C6.91143 6.54406 7.02047 6.30279 7.02047 6.0116C7.02047 5.72042 6.91143 5.47082 6.68496 5.25451L1.65237 0.320937C1.46784 0.137903 1.24137 0.0463867 0.972968 0.0463867C0.436158 0.0463867 0 0.470691 0 1.00315C0 1.26938 0.10904 1.51065 0.301956 1.71032L4.71386 6.01992L0.301956 10.3212C0.10904 10.5126 0 10.7538 0 11.0201C0 11.5525 0.436158 11.9768 0.972968 11.9768Z" fill="rgba(255,255,255,.6)" />
    </svg>`,
  [IconNamesEnum.ArrowDown]: `<svg width="19.9219" height="19.9316" viewBox="0 0 19.9219 19.9316" xmlns="http://www.w3.org/2000/svg" >
    <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM9.42383 13.7402L6.02539 8.00781Q5.83984 7.68555 5.9668 7.33887Q6.09375 6.99219 6.45508 6.99219L13.4668 6.99219Q13.8281 6.99219 13.96 7.32422Q14.0918 7.65625 13.8867 8.00781L10.5176 13.7402Q10.3223 14.0723 9.96582 14.0625Q9.60938 14.0527 9.42383 13.7402Z" fill="rgba(255,255,255,.6)"/>
    </svg>`,
  [IconNamesEnum.Comments]: `<svg width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.41797 22.209C6.86719 22.209 7.22852 22.0234 7.77539 21.5352L11.4961 18.2441H17.5117C20.5 18.2539 22.3262 16.3984 22.3262 13.4395V5.64648C22.3262 2.6875 20.5 0.841797 17.5117 0.841797H5.29492C2.31641 0.841797 0.490234 2.67773 0.490234 5.64648V13.4395C0.490234 16.4082 2.44336 18.2441 5.10938 18.2441H5.37305V21.0469C5.37305 21.7598 5.76367 22.209 6.41797 22.209Z" fill="rgba(255,255,255,.6)"/>
    </svg>`,
  [IconNamesEnum.Like]: `<svg width="22" height="23" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.748047 15.5527C0.748047 18.834 2.87695 21.5781 5.46484 21.5781H8.69727C9.97656 22.252 11.5391 22.6621 13.2871 22.6621H14.6348C15.8555 22.6621 16.9102 22.584 17.6035 22.418C18.9609 22.0859 19.8008 21.1484 19.8008 19.9473C19.8008 19.7031 19.7617 19.4688 19.6836 19.2441C20.3574 18.7461 20.7383 18.0039 20.7383 17.1934C20.7383 16.793 20.6699 16.4023 20.5137 16.0801C20.9727 15.6211 21.2363 14.9473 21.2363 14.2344C21.2363 13.7754 21.1191 13.2871 20.9141 12.9355C21.1973 12.5352 21.3633 11.998 21.3633 11.4023C21.3633 9.94727 20.2207 8.79492 18.7754 8.79492H15.0742C14.8398 8.79492 14.6836 8.6875 14.6836 8.49219C14.6836 7.42773 16.3535 4.95703 16.3535 2.97461C16.3535 1.62695 15.4062 0.650391 14.1074 0.650391C13.1504 0.650391 12.5156 1.14844 11.8809 2.35938C10.6895 4.63477 9.27344 6.66602 6.95898 9.49805H5.09375C2.69141 9.49805 0.748047 12.2227 0.748047 15.5527ZM6.42188 15.5039C6.42188 13.3945 6.90039 12.0469 8.22852 10.2695C9.69336 8.30664 11.7246 5.95312 13.1992 3.0332C13.5605 2.29102 13.8145 2.125 14.166 2.125C14.5859 2.125 14.8789 2.42773 14.8789 2.97461C14.8789 4.55664 13.209 6.95898 13.209 8.49219C13.209 9.5957 14.127 10.2695 15.2891 10.2695H18.7754C19.4102 10.2695 19.8887 10.7578 19.8887 11.4023C19.8887 11.8711 19.7422 12.1738 19.3516 12.5449C19.1758 12.7109 19.1562 12.9062 19.3027 13.0918C19.625 13.5605 19.7617 13.8535 19.7617 14.2344C19.7617 14.7031 19.5469 15.0938 19.0977 15.4355C18.8535 15.6113 18.7559 15.8652 18.9023 16.168C19.1465 16.627 19.2637 16.8418 19.2637 17.1934C19.2637 17.7207 18.9316 18.1211 18.2285 18.4824C18.0039 18.6094 17.9551 18.7949 18.043 19.0098C18.2871 19.6055 18.3262 19.7031 18.3262 19.9473C18.3262 20.4258 17.9746 20.8066 17.252 20.9824C16.6758 21.1289 15.7578 21.1973 14.6445 21.1875L13.2969 21.168C9.20508 21.1289 6.42188 18.8242 6.42188 15.5039ZM2.22266 15.5527C2.22266 13.0332 3.58984 10.9727 5.09375 10.9727H6.00195C5.26953 12.3398 4.94727 13.7656 4.94727 15.4746C4.94727 17.3105 5.61133 18.8926 6.79297 20.1035H5.46484C3.73633 20.1035 2.22266 18.0234 2.22266 15.5527Z" fill="rgba(255,255,255,.6)" />
    </svg>`,
  [IconNamesEnum.Liked]: `<svg width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.00195 14.4746C4.94336 18.166 7.94141 20.9688 12.6387 21.0078L14.0254 21.0176C15.334 21.0273 16.3008 20.9297 16.8477 20.7832C17.6387 20.5781 18.4102 20.0996 18.4102 19.1426C18.4102 18.752 18.3125 18.4785 18.1758 18.2539C18.0977 18.127 18.1074 18.0195 18.2344 17.9707C18.8594 17.7168 19.3867 17.1309 19.3867 16.3203C19.3867 15.8711 19.25 15.4609 19.0352 15.1777C18.918 15.0312 18.9375 14.9043 19.1133 14.7871C19.5723 14.5234 19.8848 13.957 19.8848 13.293C19.8848 12.834 19.7383 12.3262 19.4648 12.082C19.3086 11.9355 19.3379 11.8379 19.5039 11.6914C19.8262 11.4277 20.0215 10.959 20.0215 10.3926C20.0215 9.41602 19.2598 8.625 18.2637 8.625H14.6992C13.791 8.625 13.1953 8.15625 13.1953 7.41406C13.1953 6.04688 14.8848 3.56641 14.8848 1.7793C14.8848 0.841797 14.2793 0.285156 13.4883 0.285156C12.7656 0.285156 12.4043 0.783203 12.0137 1.54492C10.5195 4.47461 8.50781 6.84766 6.97461 8.87891C5.67578 10.6074 5.04102 12.082 5.00195 14.4746ZM0.0800781 14.543C0.0800781 17.541 1.95508 20.0508 4.45508 20.0508H6.24219C4.42578 18.7324 3.60547 16.7305 3.64453 14.4453C3.68359 11.9062 4.66016 10.0996 5.54883 8.99609H4.08398C1.81836 8.99609 0.0800781 11.4375 0.0800781 14.543Z" fill="rgba(255,255,255,.6)"  />
    </svg>`,
  [IconNamesEnum.Check]: `<svg width="19.9219" height="19.9316" viewBox="0 0 19.9219 19.9316" xmlns="http://www.w3.org/2000/svg" >
    <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM8.86719 14.7266Q8.61328 14.7266 8.4082 14.6191Q8.20312 14.5117 8.00781 14.2578L5.55664 11.25Q5.44922 11.1035 5.38574 10.9424Q5.32227 10.7812 5.32227 10.6152Q5.32227 10.2832 5.54688 10.0439Q5.77148 9.80469 6.10352 9.80469Q6.31836 9.80469 6.48926 9.89258Q6.66016 9.98047 6.8457 10.2246L8.82812 12.7832L12.998 6.08398Q13.2715 5.63477 13.7012 5.63477Q14.0137 5.63477 14.2676 5.83496Q14.5215 6.03516 14.5215 6.37695Q14.5215 6.54297 14.4434 6.70898Q14.3652 6.875 14.2773 7.02148L9.6875 14.2578Q9.53125 14.4922 9.32617 14.6094Q9.12109 14.7266 8.86719 14.7266Z" fill="rgba(255,255,255,1)"/>
    </svg>`,
  [IconNamesEnum.Warning]: `<svg width="20.1074" height="18.5254" viewBox="0 0 20.1074 18.5254"  xmlns="http://www.w3.org/2000/svg">
    <path d="M2.38281 18.4863L17.7246 18.4863Q18.457 18.4863 18.9941 18.1689Q19.5312 17.8516 19.8193 17.3096Q20.1074 16.7676 20.1074 16.1035Q20.1074 15.8008 20.0293 15.5078Q19.9512 15.2148 19.7949 14.9316L12.1094 1.21094Q11.7773 0.615234 11.2207 0.307617Q10.6641 0 10.0586 0Q9.45312 0 8.8916 0.307617Q8.33008 0.615234 7.99805 1.21094L0.322266 14.9414Q0 15.5273 0 16.1035Q0 16.7676 0.292969 17.3096Q0.585938 17.8516 1.11816 18.1689Q1.65039 18.4863 2.38281 18.4863ZM10.0684 11.9531Q9.28711 11.9531 9.26758 11.1523L9.14062 5.83008Q9.13086 5.44922 9.38965 5.19531Q9.64844 4.94141 10.0586 4.94141Q10.459 4.94141 10.7275 5.2002Q10.9961 5.45898 10.9863 5.83984L10.8398 11.1523Q10.8301 11.9531 10.0684 11.9531ZM10.0684 15.2246Q9.62891 15.2246 9.30176 14.9219Q8.97461 14.6191 8.97461 14.1797Q8.97461 13.75 9.29688 13.4375Q9.61914 13.125 10.0684 13.125Q10.5078 13.125 10.835 13.4326Q11.1621 13.7402 11.1621 14.1797Q11.1621 14.6191 10.835 14.9219Q10.5078 15.2246 10.0684 15.2246Z" fill="rgba(248, 207, 90, 1)"/>
    </svg>`,
  [IconNamesEnum.Team]: `<svg version="1.1" width="19.9219" height="19.9316" viewBox="0 0 19.9219 19.9316" xmlns="http://www.w3.org/2000/svg"> 
      <rect height="19.9316" opacity="0" width="19.9219" x="0" y="0"/>
      <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM9.98047 13.8867Q8.88672 13.8867 7.98828 13.3545Q7.08984 12.8223 6.55762 11.9287Q6.02539 11.0352 6.02539 9.94141Q6.02539 8.84766 6.55762 7.9541Q7.08984 7.06055 7.98828 6.52832Q8.88672 5.99609 9.98047 5.99609Q11.0645 5.99609 11.958 6.52832Q12.8516 7.06055 13.3838 7.9541Q13.916 8.84766 13.916 9.94141Q13.916 11.0352 13.3838 11.9287Q12.8516 12.8223 11.958 13.3545Q11.0645 13.8867 9.98047 13.8867Z" fill="rgba(255,255,255,.6)"/>
    </svg>`,
  [IconNamesEnum.Badge]: `<svg version="1.1" width="22.1826" height="22.2071" viewBox="0 0 22.1826 22.2071" xmlns="http://www.w3.org/2000/svg">
      <rect height="22.2071" opacity="0" width="22.1826" x="0" y="0"/>
      <path d="M5.17578 19.5655L7.29492 19.5655Q7.58789 19.5655 7.7832 19.7705L9.28711 21.2647Q10.2148 22.1924 11.0938 22.1875Q11.9727 22.1826 12.8906 21.2647L14.3945 19.7705Q14.5996 19.5655 14.8926 19.5655L17.002 19.5655Q18.3105 19.5655 18.9355 18.9453Q19.5605 18.3252 19.5605 17.0069L19.5605 14.8975Q19.5605 14.6045 19.7656 14.3994L21.2598 12.8955Q22.1875 11.9776 22.1826 11.0987Q22.1777 10.2198 21.2598 9.29202L19.7656 7.78811Q19.5605 7.58303 19.5605 7.29983L19.5605 5.18069Q19.5605 3.88186 18.9404 3.25198Q18.3203 2.6221 17.002 2.6221L14.8926 2.6221Q14.5996 2.6221 14.3945 2.42678L12.8906 0.932642Q11.9727-0.00485751 11.0938 2.52995e-05Q10.2148 0.00490811 9.28711 0.932642L7.7832 2.42678Q7.58789 2.6221 7.29492 2.6221L5.17578 2.6221Q3.86719 2.6221 3.24219 3.24221Q2.61719 3.86233 2.61719 5.18069L2.61719 7.29983Q2.61719 7.58303 2.42188 7.78811L0.927734 9.29202Q0 10.2198 0 11.0987Q0 11.9776 0.927734 12.8955L2.42188 14.3994Q2.61719 14.6045 2.61719 14.8975L2.61719 17.0069Q2.61719 18.3155 3.24219 18.9405Q3.86719 19.5655 5.17578 19.5655ZM10 15.8643Q9.74609 15.8643 9.54102 15.7569Q9.33594 15.6494 9.14062 15.3955L6.68945 12.3877Q6.58203 12.2412 6.51855 12.0801Q6.45508 11.919 6.45508 11.753Q6.45508 11.4209 6.67969 11.1817Q6.9043 10.9424 7.23633 10.9424Q7.45117 10.9424 7.62207 11.0303Q7.79297 11.1182 7.97852 11.3623L9.96094 13.9209L14.1309 7.2217Q14.4043 6.77249 14.834 6.77249Q15.1465 6.77249 15.4004 6.97268Q15.6543 7.17288 15.6543 7.51467Q15.6543 7.68069 15.5762 7.8467Q15.498 8.01272 15.4102 8.1592L10.8203 15.3955Q10.6641 15.6299 10.459 15.7471Q10.2539 15.8643 10 15.8643Z" fill="rgba(0,0,0,0.85)"/>
    </svg>`,
  [IconNamesEnum.Info]: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="12" fill="white"/>
    <rect x="14" y="13" width="2" height="9" rx="1" fill="#333333"/>
    <rect x="13.5" y="9" width="3" height="3" rx="1.5" fill="#333333"/>
    </svg>`,
  [IconNamesEnum.Home]: `<svg version="1.1" width="21.1035" height="17.998" viewBox="0 0 21.1035 17.998" xmlns="http://www.w3.org/2000/svg">
    <rect height="17.998" opacity="0" width="21.1035" x="0" y="0"/>
    <path d="M2.24609 8.20312L18.8574 8.20312Q19.9805 8.20312 20.542 7.65137Q21.1035 7.09961 21.1035 5.9668L21.1035 2.23633Q21.1035 1.11328 20.542 0.566406Q19.9805 0.0195312 18.8574 0.0195312L2.24609 0.0195312Q1.12305 0.0195312 0.561523 0.566406Q0 1.11328 0 2.23633L0 5.9668Q0 7.09961 0.561523 7.65137Q1.12305 8.20312 2.24609 8.20312ZM2.24609 17.998L18.8574 17.998Q19.9805 17.998 20.542 17.4463Q21.1035 16.8945 21.1035 15.7715L21.1035 12.0312Q21.1035 10.918 20.542 10.3662Q19.9805 9.81445 18.8574 9.81445L2.24609 9.81445Q1.12305 9.81445 0.561523 10.3662Q0 10.918 0 12.0312L0 15.7715Q0 16.8945 0.561523 17.4463Q1.12305 17.998 2.24609 17.998Z" fill="rgba(0,0,0,0.85)"/>
    </svg>`,
  [IconNamesEnum.Search]: `<svg version="1.1" width="19.082" height="19.2676" viewBox="0 0 19.082 19.2676" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect height="19.2676" opacity="0" width="19.082" x="0" y="0"/>
    <path d="M0 7.79297Q0 9.4043 0.605469 10.8154Q1.21094 12.2266 2.28516 13.3008Q3.35938 14.375 4.77051 14.9805Q6.18164 15.5859 7.79297 15.5859Q9.0625 15.5859 10.2148 15.1953Q11.3672 14.8047 12.3242 14.1211L17.1289 18.9355Q17.3047 19.1016 17.5146 19.1846Q17.7246 19.2676 17.959 19.2676Q18.291 19.2676 18.5449 19.1162Q18.7988 18.9648 18.9404 18.7012Q19.082 18.4375 19.082 18.1152Q19.082 17.8809 18.999 17.6758Q18.916 17.4707 18.7598 17.3145L13.9844 12.5098Q14.7363 11.5332 15.1611 10.332Q15.5859 9.13086 15.5859 7.79297Q15.5859 6.18164 14.9805 4.77051Q14.375 3.35938 13.3008 2.28516Q12.2266 1.21094 10.8154 0.605469Q9.4043 0 7.79297 0Q6.18164 0 4.77051 0.605469Q3.35938 1.21094 2.28516 2.28516Q1.21094 3.35938 0.605469 4.77051Q0 6.18164 0 7.79297ZM1.66992 7.79297Q1.66992 6.52344 2.14355 5.41504Q2.61719 4.30664 3.46191 3.46191Q4.30664 2.61719 5.41504 2.14355Q6.52344 1.66992 7.79297 1.66992Q9.0625 1.66992 10.1709 2.14355Q11.2793 2.61719 12.1191 3.46191Q12.959 4.30664 13.4375 5.41504Q13.916 6.52344 13.916 7.79297Q13.916 9.0625 13.4375 10.1709Q12.959 11.2793 12.1191 12.1191Q11.2793 12.959 10.1709 13.4375Q9.0625 13.916 7.79297 13.916Q6.52344 13.916 5.41504 13.4375Q4.30664 12.959 3.46191 12.1191Q2.61719 11.2793 2.14355 10.1709Q1.66992 9.0625 1.66992 7.79297Z" fill="rgba(0,0,0,0.85)"/>
    </svg>`,
  [IconNamesEnum.Add]: `<svg version="1.1" width="19.9219" height="19.9316" viewBox="0 0 19.9219 19.9316" xmlns="http://www.w3.org/2000/svg">
      <rect height="19.9316" opacity="0" width="19.9219" x="0" y="0"/>
      <path d="M9.96094 19.9219Q12.002 19.9219 13.8037 19.1406Q15.6055 18.3594 16.9824 16.9824Q18.3594 15.6055 19.1406 13.8037Q19.9219 12.002 19.9219 9.96094Q19.9219 7.91992 19.1406 6.11816Q18.3594 4.31641 16.9824 2.93945Q15.6055 1.5625 13.7988 0.78125Q11.9922 0 9.95117 0Q7.91016 0 6.1084 0.78125Q4.30664 1.5625 2.93457 2.93945Q1.5625 4.31641 0.78125 6.11816Q0 7.91992 0 9.96094Q0 12.002 0.78125 13.8037Q1.5625 15.6055 2.93945 16.9824Q4.31641 18.3594 6.11816 19.1406Q7.91992 19.9219 9.96094 19.9219ZM5.19531 9.9707Q5.19531 9.58984 5.43945 9.35059Q5.68359 9.11133 6.06445 9.11133L9.12109 9.11133L9.12109 6.05469Q9.12109 5.67383 9.35059 5.42969Q9.58008 5.18555 9.95117 5.18555Q10.332 5.18555 10.5713 5.42969Q10.8105 5.67383 10.8105 6.05469L10.8105 9.11133L13.877 9.11133Q14.2578 9.11133 14.4971 9.35059Q14.7363 9.58984 14.7363 9.9707Q14.7363 10.3418 14.4922 10.5713Q14.248 10.8008 13.877 10.8008L10.8105 10.8008L10.8105 13.8672Q10.8105 14.248 10.5713 14.4873Q10.332 14.7266 9.95117 14.7266Q9.58008 14.7266 9.35059 14.4873Q9.12109 14.248 9.12109 13.8672L9.12109 10.8008L6.06445 10.8008Q5.68359 10.8008 5.43945 10.5713Q5.19531 10.3418 5.19531 9.9707Z" fill="rgba(0,0,0,0.85)"/>
    </svg>`,
};

export default icons;
