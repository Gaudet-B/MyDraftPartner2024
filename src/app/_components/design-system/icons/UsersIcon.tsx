export function UsersIcon({
  dimensions,
}: {
  dimensions: { h?: number; w?: number };
}) {
  const { h, w } = dimensions;
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      // width="512"
      // height="512"
      width={w}
      height={h}
      viewBox="0 0 512 512"
    >
      <path
        d="M0 0 C0.93467606 -0.00335861 1.86935211 -0.00671722 2.83235168 -0.01017761 C5.89776977 -0.01961364 8.96313278 -0.02162713 12.02856445 -0.02270508 C14.17934694 -0.02592317 16.33012921 -0.02928765 18.48091125 -0.03279114 C22.98207099 -0.03876435 27.48321158 -0.04063294 31.984375 -0.04003906 C37.71895988 -0.03993764 43.4534204 -0.05357763 49.18797588 -0.07081127 C53.62954764 -0.08199499 58.07108995 -0.08395631 62.51267433 -0.08342934 C64.62512451 -0.08460034 66.73757568 -0.08897196 68.85001183 -0.0967617 C94.43257546 -0.18225774 117.4721359 2.69567762 136.5559082 21.46948242 C137.42989258 22.35249023 138.30387695 23.23549805 139.2043457 24.14526367 C139.87208008 24.79108398 140.53981445 25.4369043 141.2277832 26.10229492 C156.95915912 42.43872375 159.35001332 64.70389593 159.36547852 86.26855469 C159.37011497 87.78397744 159.37514073 89.29939905 159.38052368 90.81481934 C159.39356264 94.90766781 159.4000749 99.00049995 159.40453434 103.09336591 C159.40747648 105.65420004 159.41158319 108.21502982 159.41603851 110.77586174 C159.42968573 118.79983706 159.43936816 126.82380228 159.4432404 134.84778839 C159.44772639 144.09023519 159.46531095 153.33253449 159.494241 162.57493645 C159.51587472 169.73612091 159.52594545 176.89726389 159.52728152 184.05848068 C159.52832755 188.32875922 159.53419321 192.59889857 159.55210114 196.86914253 C159.56861308 200.88377517 159.57072229 204.89816435 159.56196213 208.91281891 C159.56119365 210.38173768 159.5655094 211.85066974 159.57542038 213.31955528 C159.68495174 230.5705872 159.68495174 230.5705872 153.8918457 236.52026367 C148.15523672 239.98891097 143.00568767 240.43667442 136.48831177 240.40596008 C135.62311664 240.40978563 134.75792152 240.41361118 133.86650836 240.41755265 C130.97401303 240.42785253 128.08171731 240.42389621 125.18920898 240.41992188 C123.11265886 240.42427002 121.03611034 240.42945352 118.95956421 240.43540955 C113.32318039 240.4488 107.68686364 240.44937813 102.05046701 240.44684625 C97.34370283 240.44577652 92.6369522 240.45065997 87.93019092 240.45545167 C76.8251137 240.46654712 65.72007031 240.4669841 54.61499023 240.4609375 C43.16220962 240.45489741 31.70955185 240.46720958 20.25679219 240.48850757 C10.42052621 240.50612626 0.58429932 240.51212448 -9.25198185 240.50886983 C-15.12524513 240.50705719 -20.99842079 240.5096913 -26.87166977 240.52358437 C-32.39566033 240.53616228 -37.91945948 240.5342188 -43.44344711 240.52117348 C-45.46868962 240.51880805 -47.4939456 240.52154117 -49.51917267 240.5297966 C-52.28822098 240.54026852 -55.05662757 240.53215971 -57.82565308 240.51948547 C-58.62313866 240.52685976 -59.42062425 240.53423404 -60.24227607 240.54183179 C-66.61897818 240.48061761 -72.43745973 239.44140049 -77.1706543 234.83276367 C-80.17530516 229.86353339 -81.04573959 225.39595011 -81.04962158 219.63354492 C-81.05526123 218.3413353 -81.06090088 217.04912567 -81.06671143 215.71775818 C-81.06282319 214.29775944 -81.05872688 212.87776127 -81.05444336 211.45776367 C-81.0571555 209.95251802 -81.06071768 208.44727369 -81.06506348 206.94203186 C-81.0741695 202.8609656 -81.07064893 198.78000065 -81.06430531 194.69893265 C-81.05922862 190.41468287 -81.06394208 186.13044154 -81.06707764 181.84619141 C-81.07071557 174.64362032 -81.06592601 167.44109025 -81.05639648 160.23852539 C-81.04554532 151.94189328 -81.04901384 143.64535974 -81.0600493 135.34873009 C-81.06916673 128.2053411 -81.0703848 121.06198157 -81.06517196 113.91858864 C-81.06207237 109.66152969 -81.06158635 105.40451682 -81.06824493 101.14746094 C-81.07408166 97.13533942 -81.06990756 93.12334288 -81.05845642 89.11123466 C-81.05584186 87.64968509 -81.05651905 86.18812476 -81.06098175 84.72657967 C-81.1263727 61.10710319 -76.43575004 40.03810732 -59.47143555 22.79370117 C-58.14692383 21.48272461 -58.14692383 21.48272461 -56.7956543 20.14526367 C-56.14983398 19.4775293 -55.50401367 18.80979492 -54.83862305 18.12182617 C-40.15927014 3.986153 -19.64773897 -0.01032932 0 0 Z "
        fill="#000000"
        transform="translate(216.795654296875,233.854736328125)"
      />
      <path
        d="M0 0 C18.328519 18.91037674 24.93301885 42.89641412 24.578125 68.66015625 C23.98055482 87.78533138 16.24474781 106.68948847 3.3125 120.8125 C2.82394531 121.42867187 2.33539063 122.04484375 1.83203125 122.6796875 C-11.17532653 139.07551664 -33.20195103 148.89745397 -53.54443359 151.58544922 C-76.60042007 154.02815455 -99.86501512 148.55558807 -118.4375 134.3125 C-119.85991082 133.15284358 -121.27697966 131.98659026 -122.6875 130.8125 C-123.29207031 130.34199219 -123.89664063 129.87148437 -124.51953125 129.38671875 C-139.32774144 117.52009433 -151.12063928 95.90304185 -153.49267578 76.99951172 C-155.80687807 51.02128605 -151.30942379 26.85076112 -134.59765625 6.234375 C-132.36661737 3.6778946 -130.06693832 1.23120298 -127.6875 -1.1875 C-126.92695313 -1.9609375 -126.16640625 -2.734375 -125.3828125 -3.53125 C-89.42464372 -37.95677552 -34.46836482 -32.51372726 0 0 Z "
        fill="#000000"
        transform="translate(320.6875,65.1875)"
      />
      <path
        d="M0 0 C6.82766662 -0.10263843 13.65512958 -0.17197643 20.48339844 -0.21972656 C22.79922926 -0.2396629 25.11501095 -0.26682197 27.43066406 -0.30175781 C43.85406885 -0.54306972 59.30456796 -0.3092584 74.1875 7.5625 C74.83984619 7.90055664 75.49219238 8.23861328 76.16430664 8.58691406 C92.7606796 17.58847352 104.65486886 32.26476332 111 50 C111.26012375 50.72565659 111.5202475 51.45131317 111.78825378 52.19895935 C115.03262854 63.01119019 114.45339022 74.13405722 114.43359375 85.31640625 C114.4381623 87.5821905 114.44346987 89.84797338 114.44947815 92.11375427 C114.4583771 96.84501808 114.45602173 101.57611279 114.44604492 106.30737305 C114.43454272 112.34836995 114.45480294 118.38878338 114.48396206 124.42970371 C114.50236719 129.102795 114.50202325 133.77574743 114.49632454 138.44886589 C114.49617194 140.67544309 114.50216476 142.90203007 114.51461601 145.12857246 C114.59593635 162.04743037 113.27318699 174.82211184 101.4375 187.8125 C100.633125 188.534375 99.82875 189.25625 99 190 C97.948125 190.99 97.948125 190.99 96.875 192 C84.14790012 200.8536347 70.18066518 201.30797144 55.171875 201.1953125 C53.68687126 201.19157205 52.20186502 201.18872997 50.71685791 201.18673706 C46.8502901 201.17918172 42.98387788 201.15960519 39.11737061 201.1373291 C35.15509138 201.11669383 31.19278647 201.10769794 27.23046875 201.09765625 C19.48690903 201.07634971 11.7434765 201.0423146 4 201 C4.16210339 199.83008798 4.32420677 198.66017595 4.49122238 197.45481205 C4.97963638 193.52966791 5.13078432 189.68194842 5.14044189 185.7230072 C5.14341302 185.03663494 5.14638414 184.35026268 5.1494453 183.64309126 C5.15804335 181.36743546 5.15963293 179.0918328 5.16113281 176.81616211 C5.16576737 175.17431529 5.17079288 173.53246953 5.17617798 171.890625 C5.18924423 167.44601883 5.19573584 163.00142773 5.20018864 158.55680537 C5.20312927 155.7733018 5.20723595 152.98980226 5.21169281 150.20630074 C5.22535376 141.47804597 5.23502675 132.74980052 5.2388947 124.02153581 C5.24336937 113.98224675 5.26089573 103.94309425 5.2898953 93.90384668 C5.31159078 86.12007307 5.32160319 78.33633766 5.32293582 70.55253416 C5.32397841 65.91481577 5.32976866 61.27722599 5.34775543 56.63953972 C5.36437238 52.27032957 5.3663264 47.90134283 5.35761642 43.53211212 C5.35685322 41.94035552 5.36109245 40.34858622 5.37107468 38.75686073 C5.43198391 28.42773029 4.38160007 19.06783529 2 9 C1.60273844 7.1878125 1.20667667 5.37536101 0.8125 3.5625 C0.544375 2.386875 0.27625 1.21125 0 0 Z "
        fill="#000000"
        transform="translate(398,273)"
      />
      <path
        d="M0 0 C2.33592207 0.0201093 4.67186099 0.03835217 7.0078125 0.0546875 C12.67224897 0.09829956 18.33604336 0.1648553 24 0.25 C23.58427734 1.96896484 23.58427734 1.96896484 23.16015625 3.72265625 C22.79410461 5.2525644 22.42822853 6.78251457 22.0625 8.3125 C21.88009766 9.06466797 21.69769531 9.81683594 21.50976562 10.59179688 C21.24389648 11.70844727 21.24389648 11.70844727 20.97265625 12.84765625 C20.72914429 13.86098022 20.72914429 13.86098022 20.48071289 14.89477539 C19.35000323 20.43462103 18.87474906 25.80376006 18.87301636 31.45384216 C18.87145637 32.14429896 18.86989638 32.83475576 18.86828911 33.54613549 C18.86432602 35.84124472 18.86745047 38.13628686 18.87060547 40.43139648 C18.86924933 42.0844527 18.86746821 43.73750862 18.86529541 45.39056396 C18.860746 49.8678241 18.86250049 54.34506113 18.8656745 58.82232165 C18.86821139 63.5150984 18.86585681 68.2078732 18.86428833 72.90065002 C18.86247034 80.78150791 18.86486305 88.66235643 18.86962891 96.54321289 C18.87506892 105.64373192 18.87330926 114.74422853 18.8678025 123.84474701 C18.86325857 131.66830494 18.86262715 139.49185614 18.86524117 147.31541497 C18.86679714 151.98361552 18.8670164 156.65180555 18.86370468 161.32000542 C18.86080745 165.71046366 18.86283565 170.10089312 18.86859894 174.49134827 C18.86991669 176.09893814 18.86954921 177.70653045 18.86733627 179.31411934 C18.86458586 181.51583655 18.86805311 183.71746272 18.87301636 185.91917419 C18.87339338 187.14897223 18.87377041 188.37877028 18.87415886 189.64583492 C19.01148675 193.57898742 19.4586848 197.35366806 20 201.25 C11.47154747 201.29660414 2.94314929 201.33201047 -5.58539963 201.35362434 C-9.54672536 201.36400461 -13.50796314 201.37805683 -17.46923828 201.40087891 C-21.30126036 201.42281492 -25.13319854 201.43461176 -28.96527863 201.43975449 C-30.41790332 201.44341338 -31.8705241 201.4505567 -33.32311249 201.46146011 C-44.8655859 201.54455299 -56.05254446 201.37362386 -66.4375 195.875 C-68.13712891 194.99714844 -68.13712891 194.99714844 -69.87109375 194.1015625 C-79.82404205 188.21180283 -86.33948571 178.46553801 -89.53621197 167.39265919 C-90.01442924 165.18333818 -90.13406461 163.21808137 -90.14717102 160.9596405 C-90.15432632 160.10916138 -90.16148163 159.25868225 -90.16885376 158.38243103 C-90.17154266 157.45725174 -90.17423157 156.53207245 -90.17700195 155.57885742 C-90.18357315 154.59774994 -90.19014435 153.61664246 -90.19691467 152.60580444 C-90.21663625 149.35569171 -90.2283124 146.10562534 -90.23828125 142.85546875 C-90.24235678 141.74150537 -90.2464323 140.627542 -90.25063133 139.47982216 C-90.27149463 133.57517305 -90.28579106 127.67054714 -90.29516602 121.76586914 C-90.30618604 115.69818526 -90.3405343 109.6308726 -90.38033772 103.56331921 C-90.40663246 98.8729235 -90.41486959 94.18261417 -90.41844749 89.49215126 C-90.42328613 87.25769884 -90.43482125 85.02324956 -90.45348549 82.78886986 C-90.64183076 58.73142074 -85.83610181 38.43120062 -68.56542969 20.73583984 C-48.87555465 2.0470408 -25.88418328 -0.39051002 0 0 Z "
        fill="#000000"
        transform="translate(90,272.75)"
      />
      <path
        d="M0 0 C14.71859277 11.27926993 23.54295373 25.98201403 27.3046875 44 C29.86398225 64.26754634 24.90539187 82.79681869 12.44140625 99 C1.06079636 111.97857224 -15.08729794 120.88217335 -32.42431641 122.2265625 C-50.70312682 123.17961801 -68.22284462 119.23709002 -82.34301758 107.02954102 C-96.34743751 94.1572886 -105.27485019 78.12528456 -106.51171875 58.90625 C-106.78430689 39.46162929 -100.57392928 21.55187136 -87.05859375 7.3125 C-63.25108008 -15.28446213 -27.18800443 -18.36278611 0 0 Z "
        fill="#000000"
        transform="translate(451.30859375,132.9375)"
      />
      <path
        d="M0 0 C17.39011136 -0.53400876 33.99727178 5.00051658 47.34765625 16.26171875 C60.89910537 29.02529292 69.32990387 44.76827208 70.5859375 63.4765625 C71.11240801 83.96313229 64.04686014 100.98396804 50.17578125 115.84765625 C36.017951 129.399415 18.39436032 134.75959476 -0.828125 134.43359375 C-17.97921058 133.73971847 -33.39813215 126.06292797 -45.63671875 114.16015625 C-58.58050973 99.93028347 -64.46385276 82.6620989 -63.9453125 63.6015625 C-62.91366496 43.98313645 -53.59066462 28.09239734 -39.3515625 15.0703125 C-28.07982156 5.72151829 -14.48401784 0.87976997 0 0 Z "
        fill="#000000"
        transform="translate(96.63671875,120.83984375)"
      />
    </svg>
  );
}