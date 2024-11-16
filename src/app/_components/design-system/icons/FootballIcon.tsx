export function FootballIcon({
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
        d="M0 0 C0.57581837 0.57229625 1.15163675 1.1445925 1.74490416 1.73423105 C2.41732126 2.39052592 3.08973836 3.04682079 3.78253174 3.72300339 C4.50792983 4.45614449 5.23332792 5.18928558 5.98070776 5.94464308 C6.7615604 6.71416794 7.54241304 7.48369279 8.34692788 8.27653658 C10.97151179 10.86936093 13.57778725 13.47984633 16.18447363 16.09065443 C18.05773908 17.948966 19.93193638 19.80629423 21.80724585 21.66253859 C26.37669541 26.19043572 30.93214909 30.73216676 35.48225932 35.27949017 C39.18044731 38.97530327 42.88255568 42.66714251 46.58747733 46.35620505 C57.08860751 56.81329677 67.5791832 67.2808149 78.05644326 77.76182335 C78.62140813 78.326988 79.18637299 78.89215265 79.76845801 79.4744435 C80.33410962 80.04029951 80.89976123 80.60615552 81.48255379 81.18915869 C90.6515544 90.36019179 99.84523981 99.5060269 109.05042915 108.6407228 C118.49944548 118.01794664 127.92972034 127.41366158 137.34074998 136.82901251 C142.6257655 142.11568885 147.91823014 147.3943781 153.23090231 152.6532746 C157.75402419 157.1309051 162.25947932 161.62542059 166.74289899 166.14281838 C169.0311948 168.44746003 171.3293627 170.74041491 173.64473975 173.0178929 C176.1536903 175.48840959 178.62997532 177.98762824 181.10033667 180.49664503 C181.83911909 181.20970964 182.57790151 181.92277424 183.33907127 182.65744686 C188.04007222 187.52303299 188.04007222 187.52303299 188.38689315 191.20614737 C188.15268638 193.48895593 187.75355103 195.57837312 187.15957129 197.79207045 C186.96242529 198.73993422 186.7652793 199.68779799 186.56215918 200.6643849 C185.79325633 203.48130258 185.02162533 206.29615092 184.22207129 209.10457045 C183.91487158 210.18561049 183.60767188 211.26665053 183.29116309 212.38044935 C174.38850093 242.99472834 162.10497115 272.18867317 146.15957129 299.79207045 C145.41707129 301.08516127 145.41707129 301.08516127 144.65957129 302.40437514 C137.7784099 314.32544965 130.34747928 325.7283264 122.15957129 336.79207045 C121.7240293 337.38068861 121.28848731 337.96930678 120.83974707 338.57576185 C112.58018753 349.66154515 103.63683244 360.16961068 94.33925879 370.39363295 C92.85594766 372.02580685 91.38231737 373.66681963 89.91738379 375.31550795 C83.09247275 382.99058091 76.03864023 390.30970492 68.23379004 396.99519545 C65.95799411 398.96669475 63.75034462 401.0034144 61.53457129 403.04207045 C55.32945777 408.62573103 48.79272063 413.73465475 42.15957129 418.79207045 C41.45155371 419.33524916 40.74353613 419.87842787 40.01406348 420.43806654 C17.69526271 437.49134491 -6.51598265 451.68216713 -31.84042871 463.79207045 C-32.56327051 464.14092299 -33.2861123 464.48977553 -34.0308584 464.84919935 C-52.98997914 473.92919116 -72.83415885 480.86078406 -92.96542871 486.85457045 C-94.39387109 487.28503676 -94.39387109 487.28503676 -95.8511709 487.72419935 C-97.2109707 488.11551039 -97.2109707 488.11551039 -98.59824121 488.5147267 C-99.37312891 488.73910414 -100.1480166 488.96348158 -100.94638574 489.19465834 C-101.90141992 489.39180434 -102.8564541 489.58895033 -103.84042871 489.79207045 C-104.91656914 490.05149222 -104.91656914 490.05149222 -106.01444978 490.31615484 C-109.73009273 490.99376527 -112.58791443 491.45199867 -116.01094508 489.64846271 C-118.24737584 487.80570339 -120.24865665 485.85019198 -122.26283777 483.76648146 C-123.04796253 482.99851659 -123.83308729 482.23055173 -124.64200372 481.4393152 C-127.26575602 478.85943635 -129.84843265 476.24201294 -132.43295801 473.622881 C-134.30572327 471.76502149 -136.18050771 469.9094243 -138.05794275 468.0563069 C-142.62241061 463.54072439 -147.15667363 458.9959378 -151.68076792 454.43994268 C-155.35840675 450.73745 -159.04665602 447.04584803 -162.74272096 443.36175162 C-163.26897342 442.83718472 -163.79522588 442.31261782 -164.33742538 441.77215496 C-165.40658124 440.70651612 -166.47576172 439.64090199 -167.54496656 438.57531229 C-177.56707877 428.58455888 -187.55521256 418.56038151 -197.53204028 408.52443454 C-206.09138427 399.91594537 -214.67916003 391.33670612 -223.28842676 382.77815443 C-233.28873614 372.83672696 -243.27093835 362.87767813 -253.22495908 352.88988721 C-254.28665292 351.82468937 -255.34836977 350.75951444 -256.41010988 349.6943627 C-256.93248166 349.17029388 -257.45485345 348.64622507 -257.99305468 348.10627538 C-261.67347492 344.41636184 -265.36649612 340.73935771 -269.06458604 337.06716162 C-273.57181001 332.59080598 -278.05887244 328.0953458 -282.52132239 323.57433709 C-284.79838872 321.26837978 -287.08611499 318.97520577 -289.39288843 316.69891173 C-291.89317312 314.2286385 -294.35717755 311.72705725 -296.81483972 309.21447951 C-297.55021154 308.50364562 -298.28558336 307.79281174 -299.04323918 307.06043744 C-303.71980838 302.17865015 -303.71980838 302.17865015 -304.06947994 298.15903348 C-303.83784948 295.62280915 -303.43982039 293.26494729 -302.84042871 290.79207045 C-302.60775293 289.73044691 -302.37507715 288.66882338 -302.13535058 287.57502943 C-301.72639551 286.19553114 -301.72639551 286.19553114 -301.30917871 284.7881642 C-300.99843408 283.73161635 -300.68768945 282.6750685 -300.36752832 281.58650404 C-300.02858545 280.47871596 -299.68964258 279.37092787 -299.34042871 278.22957045 C-298.98150537 277.04701674 -298.62258203 275.86446303 -298.25278223 274.64607435 C-288.34427589 242.45040358 -275.32347126 211.63133518 -257.84042871 182.79207045 C-257.34478418 181.96610365 -256.84913965 181.14013685 -256.33847558 180.28914076 C-243.2123513 158.52467777 -227.740978 138.10802106 -210.39511621 119.5303517 C-207.96150804 116.9218512 -205.58388924 114.27216181 -203.21542871 111.60457045 C-197.15024875 104.85827402 -190.8054284 98.49146115 -183.91464746 92.58894545 C-181.63885153 90.61744615 -179.43120204 88.5807265 -177.21542871 86.54207045 C-171.01031519 80.95840987 -164.47357805 75.84948615 -157.84042871 70.79207045 C-157.13241113 70.24889174 -156.42439355 69.70571303 -155.6949209 69.14607435 C-138.09230952 55.69632699 -119.39634119 44.17712463 -99.84042871 33.79207045 C-99.20427637 33.45401381 -98.56812402 33.11595717 -97.91269433 32.76765639 C-93.27521986 30.327773 -88.57590609 28.03498023 -83.84042871 25.79207045 C-82.9981875 25.38907728 -82.15594629 24.98608412 -81.28818262 24.57087904 C-67.90835074 18.23256211 -54.30821317 13.02987794 -40.27792871 8.35457045 C-39.52805688 8.10340468 -38.77818506 7.85223891 -38.00558984 7.59346205 C-5.12200049 -3.3617253 -5.12200049 -3.3617253 0 0 Z M-21.15292871 139.35457045 C-23.32567563 142.49298267 -24.03099581 144.2685681 -24.15292871 148.04207045 C-24.19031152 148.7897267 -24.22769433 149.53738295 -24.26620996 150.30769545 C-23.16246959 156.74786862 -17.58589369 161.30004732 -13.09042871 165.66707045 C-12.48843652 166.2600392 -11.88644433 166.85300795 -11.26620996 167.46394545 C-9.79550926 168.91130169 -8.31860201 170.35234675 -6.84042871 171.79207045 C-11.94491693 177.97341914 -17.52337813 183.59029923 -23.21542871 189.22957045 C-24.14226465 190.15189467 -25.06910058 191.07421889 -26.02402246 192.02449232 C-28.29388717 194.2826567 -30.56606409 196.53843986 -32.84042871 198.79207045 C-37.60048436 196.62864011 -40.66900165 193.00876953 -44.15488183 189.22371107 C-47.77136316 185.4489796 -50.86053039 183.45981157 -55.84042871 181.79207045 C-61.29229565 181.88771724 -64.63667678 183.35263705 -68.84042871 186.79207045 C-72.16522835 190.56017671 -72.48493975 194.38371138 -72.30527246 199.2491017 C-70.76505792 207.67498121 -61.68967497 214.15090014 -55.84042871 219.79207045 C-57.42474324 223.70058244 -60.10677966 226.31574401 -63.06699121 229.21394545 C-63.57467035 229.71879469 -64.08234949 230.22364393 -64.60541284 230.74379164 C-66.22076713 232.34799141 -67.8429508 233.94507901 -69.46542871 235.54207045 C-70.56484569 236.63145152 -71.6638093 237.72129035 -72.76230371 238.8116017 C-75.44978891 241.4770893 -78.14341892 244.13622188 -80.84042871 246.79207045 C-85.37170959 244.70928385 -88.31010526 241.4315658 -91.68613183 237.86824232 C-95.16628487 234.27159882 -98.26154668 231.24572482 -103.30527246 230.3584767 C-108.95976614 230.34954385 -112.56273197 230.71807355 -116.84042871 234.79207045 C-119.58541831 238.63839326 -120.84042871 241.65875402 -120.84042871 246.41707045 C-118.87816442 253.03971243 -114.42441113 257.48342719 -109.59042871 262.16707045 C-109.03613183 262.71234389 -108.48183496 263.25761732 -107.91074121 263.8194142 C-106.5585414 265.14830022 -105.20012521 266.47085592 -103.84042871 267.79207045 C-105.44416019 271.79724441 -108.26156857 274.46918024 -111.28574121 277.43269545 C-111.81561639 277.95974074 -112.34549158 278.48678602 -112.89142358 279.02980238 C-114.57810696 280.7053272 -116.27162435 282.37374767 -117.96542871 284.04207045 C-119.11302259 285.17962896 -120.26016332 286.31764481 -121.40683496 287.45613295 C-124.21281008 290.24010509 -127.02493335 293.01772804 -129.84042871 295.79207045 C-134.75064469 291.67580578 -139.29382526 287.3753792 -143.72714746 282.74519545 C-147.81584398 278.96636317 -151.15316891 278.33158865 -156.59433496 278.4834767 C-160.83202335 279.06569823 -163.40253632 281.11017207 -166.12949121 284.29988295 C-168.8632628 288.29825636 -169.44653484 291.78010292 -168.63339746 296.5381642 C-167.11622745 300.85051441 -164.06283318 303.65868268 -160.84042871 306.79207045 C-160.02703027 307.61707045 -159.21363183 308.44207045 -158.37558496 309.29207045 C-156.21443768 311.47711667 -154.03580214 313.64150056 -151.84042871 315.79207045 C-153.70023922 320.6206468 -157.72325768 323.74281566 -161.40878808 327.1944142 C-165.27158262 330.91908168 -168.5963283 334.56039335 -169.02011621 340.1709767 C-168.15647886 346.47658133 -168.15647886 346.47658133 -164.84042871 351.79207045 C-160.45661346 354.74047716 -156.17799402 356.79286394 -150.84042871 355.79207045 C-142.74246732 352.47593694 -136.76130897 344.97939032 -130.84042871 338.79207045 C-127.94649995 340.09510005 -125.95575822 341.45621253 -123.78183496 343.76082045 C-123.23076074 344.33187514 -122.67968652 344.90292982 -122.11191308 345.4912892 C-120.97443952 346.68986134 -119.83901281 347.89037938 -118.70566308 349.0928517 C-115.0177537 352.90555615 -112.11794599 355.56976928 -106.59433496 355.9444142 C-100.768585 355.37326224 -97.90084914 354.05056017 -93.84042871 349.79207045 C-92.13047045 346.94214002 -91.52360849 344.73331802 -91.46542871 341.41707045 C-91.43706933 340.68746107 -91.40870996 339.9578517 -91.37949121 339.20613295 C-92.60089912 332.80926781 -98.1008216 328.27840307 -102.59042871 323.91707045 C-103.1924209 323.3241017 -103.79441308 322.73113295 -104.41464746 322.12019545 C-105.88534816 320.67283921 -107.36225541 319.23179415 -108.84042871 317.79207045 C-103.73594049 311.61072176 -98.15747929 305.99384167 -92.46542871 300.35457045 C-91.53859277 299.43224623 -90.61175683 298.50992201 -89.65683496 297.55964857 C-87.38697025 295.3014842 -85.11479333 293.04570103 -82.84042871 290.79207045 C-78.08037306 292.95550079 -75.01185577 296.57537136 -71.52597558 300.36042982 C-67.90949426 304.13516129 -64.82032703 306.12432933 -59.84042871 307.79207045 C-54.38856177 307.69642366 -51.04418064 306.23150385 -46.84042871 302.79207045 C-43.51562907 299.02396419 -43.19591767 295.20042952 -43.37558496 290.3350392 C-44.9157995 281.90915968 -53.99118245 275.43324075 -59.84042871 269.79207045 C-58.25611418 265.88355846 -55.57407776 263.26839689 -52.61386621 260.37019545 C-52.10618707 259.86534621 -51.59850793 259.36049696 -51.07544458 258.84034926 C-49.46009029 257.23614948 -47.83790662 255.63906189 -46.21542871 254.04207045 C-45.11601173 252.95268937 -44.01704812 251.86285055 -42.91855371 250.7725392 C-40.23106851 248.1070516 -37.5374385 245.44791902 -34.84042871 242.79207045 C-30.30914783 244.87485705 -27.37075216 248.1525751 -23.99472558 251.71589857 C-20.51457255 255.31254208 -17.41931074 258.33841608 -12.37558496 259.2256642 C-6.72109128 259.23459705 -3.11812545 258.86606735 1.15957129 254.79207045 C3.90456089 250.94574764 5.15957129 247.92538688 5.15957129 243.16707045 C3.197307 236.54442847 -1.25644629 232.10071371 -6.09042871 227.41707045 C-6.64472558 226.87179701 -7.19902246 226.32652357 -7.77011621 225.7647267 C-9.12231602 224.43584068 -10.48073221 223.11328497 -11.84042871 221.79207045 C-10.23669723 217.78689649 -7.41928885 215.11496065 -4.39511621 212.15144545 C-3.86524103 211.62440016 -3.33536584 211.09735487 -2.78943384 210.55433851 C-1.10275046 208.8788137 0.59076693 207.21039323 2.28457129 205.54207045 C3.43216517 204.40451194 4.5793059 203.26649609 5.72597754 202.12800795 C8.53195266 199.3440358 11.34407593 196.56641285 14.15957129 193.79207045 C19.06978727 197.90833512 23.61296784 202.2087617 28.04629004 206.83894545 C32.13777718 210.62035685 35.46875887 211.23766481 40.90957129 211.11238295 C45.24297448 210.49547485 47.87702386 207.98616634 50.97207129 205.10457045 C52.80934024 201.52673091 53.45806196 197.80222772 53.15957129 193.79207045 C51.06385824 188.10931297 47.24442599 184.52230195 42.97207129 180.41707045 C41.99077246 179.45607435 41.99077246 179.45607435 40.98964942 178.4756642 C39.38626207 176.90738753 37.77628257 175.34658826 36.15957129 173.79207045 C38.32300163 169.0320148 41.94287221 165.96349751 45.72793067 162.47761732 C49.90337088 158.47722639 52.86240777 154.52599464 53.33925879 148.53425795 C52.65011782 144.31106071 51.96791747 141.05337569 49.15957129 137.79207045 C44.78287862 134.83877119 40.49130852 132.79236972 35.15957129 133.79207045 C27.0616099 137.10820396 21.08045155 144.60475057 15.15957129 150.79207045 C12.26564253 149.48904084 10.2749008 148.12792837 8.10097754 145.82332045 C7.54990332 145.25226576 6.9988291 144.68121107 6.43105567 144.0928517 C5.2935821 142.89427956 4.15815539 141.69376152 3.02480567 140.4912892 C-0.94022041 136.39209071 -3.9424218 134.10036906 -9.77792871 133.47957045 C-14.75618026 133.9875553 -17.80955312 135.64974885 -21.15292871 139.35457045 Z "
        fill="#000000"
        transform="translate(313.8404287099838,11.20792955160141)"
      />
      <path
        d="M0 0 C0.94238651 -0.00407553 1.88477303 -0.00815105 2.85571671 -0.01235008 C7.83854186 -0.03307749 12.82134052 -0.04743942 17.80419922 -0.05688477 C22.90996004 -0.06795819 28.01528626 -0.10240772 33.12089348 -0.14205647 C37.08636208 -0.16835564 41.05172865 -0.17658803 45.01727676 -0.18016624 C46.89809246 -0.18499297 48.77890483 -0.19649292 50.65963364 -0.21520424 C70.96257901 -0.404754 87.34222166 3.69641057 102.2734375 18.31640625 C113.67687432 29.9674075 120.41614377 44.52742195 120.32910156 60.89135742 C120.33435852 62.12998283 120.33435852 62.12998283 120.33972168 63.39363098 C120.34847422 66.106258 120.34270571 68.81862059 120.3359375 71.53125 C120.33728767 73.44249012 120.33923112 75.35372991 120.34173584 77.26496887 C120.34467979 81.27197538 120.3404191 85.27889258 120.33105469 89.28588867 C120.31976125 94.35956446 120.32615947 99.43302621 120.33819962 104.50669384 C120.34552456 108.45959501 120.34308063 112.41244787 120.33794403 116.36535072 C120.33663141 118.23197773 120.338169 120.09860947 120.34290314 121.96523094 C120.37188214 136.62315441 120.34465604 151.87676034 117.0703125 166.23828125 C114.29768858 164.97003955 112.24895619 163.66715461 110.09495926 161.51461029 C109.53313517 160.95800169 108.97131108 160.4013931 108.39246202 159.82791758 C107.7854526 159.21644672 107.17844319 158.60497586 106.55303955 157.97497559 C105.57398576 157.00060177 105.57398576 157.00060177 104.57515311 156.00654364 C102.38548207 153.82486111 100.20304231 151.63608578 98.02050781 149.44726562 C96.45385016 147.88331739 94.8867672 146.31979509 93.31929016 144.75666809 C89.06083091 140.50733936 84.80873771 136.251693 80.55801105 131.99463081 C76.11537291 127.54693793 71.66786722 123.1041168 67.22113037 118.66052246 C59.27750874 110.72077456 51.3389455 102.77598829 43.40234777 94.82922119 C36.20057511 87.61850682 28.99356599 80.41306109 21.78271484 73.21142578 C13.412548 64.8519514 5.04573484 56.48913894 -3.31612897 48.12135744 C-7.74394747 43.69041384 -12.17312292 39.26084938 -16.60579681 34.83476257 C-20.77006252 30.67625305 -24.92944566 26.5129221 -29.08503151 22.34573936 C-30.61521517 20.81290018 -32.1471237 19.28178076 -33.68083 17.7524662 C-35.76530917 15.67340859 -37.84359861 13.58836031 -39.92034912 11.50158691 C-40.53628142 10.89011606 -41.15221372 10.2786452 -41.78681064 9.64864492 C-45.9296875 5.46658159 -45.9296875 5.46658159 -45.9296875 3.23828125 C-43.84708286 2.92096131 -41.7635472 2.60975179 -39.6796875 2.30078125 C-37.93945312 2.03974609 -37.93945312 2.03974609 -36.1640625 1.7734375 C-24.12102657 0.17743597 -12.12598743 0.04469774 0 0 Z "
        fill="#000000"
        transform="translate(391.9296875,-0.23828125)"
      />
      <path
        d="M0 0 C2.77262392 1.2682417 4.82135631 2.57112664 6.97535324 4.72367096 C7.53717733 5.28027956 8.09900142 5.83688815 8.67785048 6.41036367 C9.2848599 7.02183453 9.89186931 7.63330539 10.51727295 8.26330566 C11.16997547 8.91288821 11.822678 9.56247075 12.49515939 10.23173761 C14.68483043 12.41342014 16.86727019 14.60219547 19.04980469 16.79101562 C20.61646234 18.35496386 22.1835453 19.91848616 23.75102234 21.48161316 C28.00948159 25.73094189 32.26157479 29.98658825 36.51230145 34.24365044 C40.95493959 38.69134332 45.40244528 43.13416445 49.84918213 47.57775879 C57.79280376 55.51750669 65.731367 63.46229296 73.66796473 71.40906006 C80.86973739 78.61977443 88.07674651 85.82522016 95.28759766 93.02685547 C103.6577645 101.38632985 112.02457766 109.74914231 120.38644147 118.11692381 C124.81425997 122.54786741 129.24343542 126.97743187 133.67610931 131.40351868 C137.84037502 135.5620282 141.99975816 139.72535915 146.15534401 143.89254189 C147.68552767 145.42538107 149.2174362 146.95650049 150.7511425 148.48581505 C152.83562167 150.56487266 154.91391111 152.64992094 156.99066162 154.73669434 C157.91456007 155.65390062 157.91456007 155.65390062 158.85712314 156.58963633 C163 160.77169966 163 160.77169966 163 163 C141.44614386 166.45113574 119.98135556 166.49926389 98.20996094 166.44604492 C93.21439428 166.43445452 88.21952408 166.45498762 83.22404861 166.48396206 C79.31862032 166.50240934 75.4133574 166.50201665 71.50789642 166.49632454 C69.66617593 166.49617299 67.82444301 166.50207648 65.9827652 166.51461601 C45.87292283 166.63254687 29.56622054 162.38337434 14.796875 147.921875 C3.39343818 136.27087375 -3.34583127 121.7108593 -3.25878906 105.34692383 C-3.2622937 104.52117355 -3.26579834 103.69542328 -3.26940918 102.84465027 C-3.27816172 100.13202325 -3.27239321 97.41966066 -3.265625 94.70703125 C-3.26697517 92.79579113 -3.26891862 90.88455134 -3.27142334 88.97331238 C-3.27436729 84.96630587 -3.2701066 80.95938867 -3.26074219 76.95239258 C-3.24944875 71.87871679 -3.25584697 66.80525504 -3.26788712 61.73158741 C-3.27521206 57.77868624 -3.27276813 53.82583338 -3.26763153 49.87293053 C-3.26631891 48.00630352 -3.2678565 46.13967178 -3.27259064 44.27305031 C-3.30156964 29.61512684 -3.27434354 14.36152091 0 0 Z "
        fill="#000000"
        transform="translate(3,346)"
      />
    </svg>
  );
}
