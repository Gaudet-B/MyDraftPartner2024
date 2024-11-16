export function RobotIcon({
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
        d="M0 0 C1.71687263 -0.01007584 1.71687263 -0.01007584 3.46842957 -0.02035522 C7.2282656 -0.03925156 10.98792224 -0.0432556 14.74780273 -0.04541016 C17.38321504 -0.05184519 20.01862664 -0.05857407 22.65403748 -0.06558228 C28.17236483 -0.07833411 33.69064427 -0.08135144 39.20898438 -0.08007812 C45.543749 -0.07888011 51.87817108 -0.09992678 58.2128492 -0.13156545 C64.35310671 -0.16111574 70.49320296 -0.16804749 76.63352776 -0.16685867 C79.22357516 -0.16920118 81.81362577 -0.17794748 84.4036274 -0.19352341 C114.8552205 -0.35947451 141.9657628 6.15112411 164.59667969 27.6237793 C184.75341565 47.57828433 195.11997369 73.82362638 195.27664185 102.08274841 C195.2777597 103.18167923 195.27887756 104.28061005 195.2800293 105.4128418 C195.2849942 106.5945697 195.28995911 107.77629761 195.29507446 108.99383545 C195.30960982 112.88049921 195.31648294 116.76712219 195.32202148 120.65380859 C195.32476125 122.00105501 195.32761795 123.34830118 195.33058929 124.6955471 C195.34423172 131.02588569 195.35391522 137.35621154 195.35779119 143.68656379 C195.36226939 150.95709046 195.37981989 158.22742891 195.40879178 165.4978984 C195.43049917 171.14408438 195.4405002 176.79021773 195.4418323 182.43644494 C195.44287353 185.79699418 195.45011405 189.15722534 195.46665192 192.51775551 C195.48381196 196.27198991 195.48180785 200.025771 195.4753418 203.7800293 C195.48455658 204.87288742 195.49377136 205.96574554 195.50326538 207.09172058 C195.43075972 220.6112076 191.9867535 232.68518233 182.79077148 242.86865234 C173.03088053 252.1374796 162.35642561 256.60792618 149.0058136 256.55795288 C148.1099179 256.56248399 147.21402219 256.56701511 146.29097813 256.57168353 C143.30037773 256.58430515 140.30995997 256.58270858 137.31933594 256.58105469 C135.17031114 256.5870414 133.0212885 256.59384728 130.87226868 256.60140991 C125.04147339 256.61906429 119.21073682 256.62376511 113.37991738 256.62504148 C109.73393091 256.62646416 106.08795932 256.63073601 102.44197655 256.63603592 C89.7132612 256.65453558 76.98458772 256.66270676 64.25585938 256.66113281 C52.40605125 256.65993201 40.55642544 256.68102268 28.70666343 256.71262014 C18.52127234 256.738808 8.33594069 256.74949902 -1.84948379 256.74822199 C-7.92745328 256.74771303 -14.00526079 256.75336014 -20.08319664 256.77457809 C-25.80341504 256.79400216 -31.52331763 256.79405625 -37.24354744 256.77954483 C-39.33645466 256.7774607 -41.42938185 256.78213387 -43.52225494 256.79426575 C-60.91232267 256.88849771 -73.40001122 254.77973262 -86.68969727 242.63818359 C-96.86536066 231.82819313 -99.19244496 218.42419436 -99.13989258 204.19995117 C-99.14339722 203.02143585 -99.14690186 201.84292053 -99.1505127 200.62869263 C-99.1592794 196.75158714 -99.15349671 192.87466579 -99.14672852 188.99755859 C-99.14717485 186.28626866 -99.15001669 183.57498193 -99.15252686 180.86369324 C-99.15615676 175.18555736 -99.15139572 169.50747364 -99.1418457 163.8293457 C-99.13098928 157.29980573 -99.13447015 150.77039097 -99.14549851 144.24085408 C-99.15463082 138.60482088 -99.15582709 132.96882497 -99.15062118 127.33278674 C-99.1475305 123.98007722 -99.14781573 120.62747252 -99.15369415 117.27475929 C-99.20162748 82.23947851 -93.08662818 54.19408502 -68.56860352 27.91943359 C-50.21808295 9.96899705 -25.53897989 -0.02184935 0 0 Z M-47.88110352 77.29052734 C-48.77313477 77.92603516 -49.66516602 78.56154297 -50.58422852 79.21630859 C-65.72952668 90.78680873 -75.73693792 107.44747097 -78.88110352 126.29052734 C-79.47034226 132.21978998 -79.45931249 138.16242384 -79.40258789 144.11523438 C-79.38112486 146.78786902 -79.40251163 149.45781689 -79.42797852 152.13037109 C-79.4626232 172.32892375 -74.32064222 190.34620124 -60.08325195 205.21386719 C-41.18005861 224.16240746 -20.86818454 228.78943018 5.03686523 228.84631348 C7.04498527 228.84097584 9.05310619 228.83560601 11.06121826 228.82782936 C14.55571657 228.81755139 18.05017733 228.82713534 21.54467773 228.83337402 C27.40803694 228.84060814 33.27119324 228.83117528 39.13452148 228.81201172 C45.86935189 228.790251 52.60369755 228.79730542 59.33851624 228.81931734 C65.1683816 228.83759344 70.99810285 228.83997068 76.82798767 228.82956266 C80.28913287 228.8233941 83.75005187 228.82230498 87.21118164 228.83570862 C112.10185969 228.90186875 132.8418686 226.68029376 152.11889648 209.29052734 C152.81499023 208.68724609 153.51108398 208.08396484 154.22827148 207.46240234 C168.87837664 193.94796426 175.22881742 174.67688351 176.11889648 155.29052734 C176.8370163 134.62353431 175.54455048 113.69212974 163.11889648 96.29052734 C162.48338867 95.39849609 161.84788086 94.50646484 161.19311523 93.58740234 C149.7383368 78.59357902 133.58194792 69.07632653 115.11889648 65.29052734 C107.68802875 64.38822084 100.30520497 64.1418201 92.8269043 64.14526367 C91.22203659 64.14022575 91.22203659 64.14022575 89.58474731 64.13508606 C86.08049325 64.12565986 82.5762874 64.12363718 79.07202148 64.12255859 C76.61260967 64.11934029 74.15319805 64.11597579 71.69378662 64.11247253 C66.54967811 64.10650212 61.40558634 64.10463049 56.26147461 64.10522461 C49.70423612 64.10532612 43.14710615 64.09167538 36.58989334 64.0744524 C31.51262936 64.06327654 26.43539116 64.06130711 21.35811615 64.06183434 C18.94226457 64.06066257 16.52641214 64.05628654 14.11057281 64.04850197 C-7.69039513 63.98482506 -29.36644202 64.07009095 -47.88110352 77.29052734 Z "
        fill="#000000"
        transform="translate(207.881103515625,-0.29052734375)"
      />
      <path
        d="M0 0 C1.57612931 -0.00599161 3.15225571 -0.0127986 4.7283783 -0.02035522 C8.99312006 -0.03796055 13.25778147 -0.04270836 17.52255607 -0.0439868 C20.19281385 -0.04541234 22.86305146 -0.04968962 25.53330421 -0.05498123 C34.86564038 -0.07346519 44.19791957 -0.08165411 53.53027344 -0.08007812 C62.20194223 -0.07887798 70.87336162 -0.09995962 79.54496735 -0.13156545 C87.01194852 -0.1578018 94.47884861 -0.16844231 101.94587547 -0.16716731 C106.39577091 -0.16665973 110.84544466 -0.17222898 115.29529381 -0.19352341 C119.48563905 -0.21302972 123.67555399 -0.2129466 127.8659153 -0.19849014 C129.39401002 -0.19641603 130.92213257 -0.20101844 132.45018005 -0.21321106 C147.82687691 -0.32784701 160.27493729 2.62184637 171.64575195 13.39208984 C180.54276362 22.78706859 184.72720425 33.42770628 184.76293945 46.23974609 C184.77292465 47.5187957 184.77292465 47.5187957 184.78311157 48.82368469 C184.79320135 50.62812157 184.79792973 52.43259549 184.79760742 54.23706055 C184.80191771 56.92548067 184.83809832 59.61216963 184.8762207 62.30029297 C185.07276343 92.42617577 175.51375433 119.09699423 156.42700195 142.29052734 C150.12097161 141.09977486 143.89778283 139.69390041 137.67358398 138.13305664 C118.41096612 133.31966198 99.18378535 130.17870523 79.29418945 130.08740234 C78.26712891 130.08038803 77.24006836 130.07337372 76.18188477 130.06614685 C72.88854535 130.04874785 69.59538563 130.04229537 66.30200195 130.04052734 C65.17795959 130.0398526 64.05391724 130.03917786 62.89581299 130.03848267 C46.8742886 130.05379086 31.21676826 130.31207403 15.42700195 133.29052734 C13.895354 133.57186523 13.895354 133.57186523 12.33276367 133.85888672 C1.40053713 135.90650484 -9.37993005 138.24004996 -19.96362305 141.68896484 C-22.77697442 142.33755184 -23.97788802 142.5293453 -26.57299805 141.29052734 C-47.10138645 120.28287696 -54.15264814 89.1125532 -54.01904297 60.79833984 C-54.01046348 58.02936972 -54.0395372 55.2624241 -54.07104492 52.49365234 C-54.13374037 36.86018814 -51.53723688 24.77129295 -40.47143555 13.06787109 C-28.4686831 1.72251321 -15.87023424 -0.01205715 0 0 Z M25.42700195 37.29052734 C20.58618713 43.73564679 19.63816715 50.43698085 20.42700195 58.29052734 C22.13828018 65.10095219 26.25855886 69.67826939 30.99731445 74.68115234 C33.46679398 77.33326219 35.72905008 80.08409627 37.98950195 82.91552734 C47.93097007 95.22885918 47.93097007 95.22885918 62.3137207 100.70068359 C70.76461471 101.12268726 77.00685358 98.95601624 83.5090332 93.56396484 C88.16703423 89.09889877 92.16786334 84.05574841 96.1887207 79.02099609 C98.28306836 76.46611126 100.47694133 74.07080979 102.73950195 71.66552734 C108.37357651 65.334222 111.1454693 59.2688254 110.74731445 50.70849609 C109.89617769 44.28345149 107.39613841 38.61257723 102.42700195 34.29052734 C96.65449382 30.46972589 91.65727205 28.18740086 84.69360352 28.12939453 C83.75873108 28.11978699 82.82385864 28.11017944 81.86065674 28.10028076 C80.85645691 28.09603088 79.85225708 28.09178101 78.81762695 28.08740234 C77.77684998 28.08170227 76.736073 28.0760022 75.66375732 28.07012939 C73.46147678 28.06068781 71.25918217 28.05414876 69.05688477 28.05029297 C65.70344083 28.04060373 62.35061419 28.00957853 58.99731445 27.97802734 C56.85408891 27.9714952 54.710859 27.96624556 52.56762695 27.96240234 C51.0734726 27.94388214 51.0734726 27.94388214 49.5491333 27.92498779 C39.98548235 27.95528018 32.44271461 30.60148866 25.42700195 37.29052734 Z "
        fill="#000000"
        transform="translate(190.572998046875,273.70947265625)"
      />
      <path
        d="M0 0 C1.59764694 -0.01073296 1.59764694 -0.01073296 3.22756958 -0.02168274 C4.38606415 -0.02437164 5.54455872 -0.02706055 6.73815918 -0.02983093 C8.58061722 -0.03968773 8.58061722 -0.03968773 10.46029663 -0.04974365 C14.52622729 -0.06945641 18.59211852 -0.0811435 22.65808105 -0.09111023 C24.06349201 -0.09516112 25.46890278 -0.09927814 26.87431335 -0.10346031 C33.48284495 -0.12250147 40.09136549 -0.13673157 46.69991922 -0.14507228 C54.2987991 -0.15482393 61.89738608 -0.18109333 69.49616289 -0.22157317 C75.3877156 -0.25186798 81.27918503 -0.26655395 87.17081404 -0.26985329 C90.68070473 -0.27218968 94.1902822 -0.28096274 97.7000885 -0.30631447 C101.62693326 -0.33422045 105.55340216 -0.32972346 109.48034668 -0.32279968 C110.6226474 -0.33560974 111.76494812 -0.3484198 112.94186401 -0.36161804 C129.15011345 -0.25814133 143.10348425 5.90208686 154.62683105 17.14717102 C163.95691666 27.926353 168.74694323 39.92047556 168.82995605 54.12373352 C168.83565613 54.88962799 168.8413562 55.65552246 168.847229 56.44462585 C168.85664943 58.06339653 168.86320119 59.68218614 168.86706543 61.30097961 C168.87671796 63.74355319 168.9077465 66.1852652 168.93933105 68.62763977 C169.0572019 85.81296769 165.12905984 100.21621445 152.9119873 112.96357727 C135.22466433 129.864797 114.61368574 129.60834475 91.50183105 129.54560852 C88.86494873 129.54763314 86.22806695 129.5505478 83.59118652 129.55430603 C78.08414117 129.55973443 72.57721726 129.55264931 67.07019043 129.5382843 C60.74100699 129.52196335 54.41211367 129.52725394 48.08293724 129.54376352 C41.9458577 129.55911944 35.80890481 129.55736524 29.67181396 129.54861832 C27.08209186 129.54662991 24.49236225 129.5490273 21.90264893 129.55605698 C-0.53718158 129.60361484 -19.90861599 128.70988065 -36.6739502 112.07295227 C-46.52263592 101.39760406 -51.4635196 88.67701057 -51.6114502 74.24092102 C-51.61952194 73.4797699 -51.62759369 72.71861877 -51.63591003 71.93440247 C-51.64970421 70.32403302 -51.66044711 68.71363491 -51.66833496 67.10322571 C-51.67979049 65.4800897 -51.70013909 63.85698942 -51.7298584 62.23408508 C-52.07691268 43.24110326 -47.71998423 28.21155702 -34.37316895 14.14717102 C-24.87044367 5.63942001 -12.87427514 0.0596451 0 0 Z M-22.6348877 48.33857727 C-28.65978141 55.27667115 -32.31575551 63.33509183 -32.87316895 72.58467102 C-32.28607012 76.76775015 -31.59773707 78.4186903 -28.37316895 81.14717102 C-24.87857432 82.08322315 -22.52711846 82.52142492 -19.06066895 81.39717102 C-14.45008731 77.98192537 -14.35273145 72.63042028 -13.34973145 67.37373352 C-11.9626617 62.7908551 -9.71659158 60.12115243 -5.87316895 57.33467102 C-0.17189645 55.40031071 6.01090537 55.00631746 11.8182373 56.83857727 C16.12019911 59.05924438 18.49631682 61.88614254 20.62683105 66.14717102 C21.13674574 68.18137614 21.6133552 70.22409284 22.06433105 72.27217102 C22.93826547 76.03429511 23.43300886 77.90489327 25.87683105 80.95967102 C29.62118876 82.57655276 31.73577912 82.2791134 35.62683105 81.14717102 C38.2496644 79.85824815 38.2496644 79.85824815 39.62683105 77.14717102 C41.24714168 68.16029353 38.03390267 59.24811279 32.93933105 51.89717102 C25.91210354 43.27686926 17.74335296 38.62421497 6.81433105 37.27217102 C-4.32751501 36.61347069 -14.61362239 40.56667772 -22.6348877 48.33857727 Z M85.25183105 50.52217102 C79.67710054 57.51822093 77.11568707 65.86175462 77.22058105 74.72529602 C77.67484509 77.43340853 78.21339009 78.46383329 80.18933105 80.33467102 C83.51428177 82.40680689 83.51428177 82.40680689 87.25183105 82.27217102 C91.41251718 80.88527564 92.51217143 79.98488664 94.62683105 76.14717102 C95.208385 73.6368662 95.64256221 71.11918327 96.0838623 68.58076477 C97.20135024 63.57216776 99.6899648 60.8888568 103.62683105 57.77217102 C108.67974184 55.19681649 114.1245883 55.30796954 119.62683105 56.14717102 C124.04476222 57.80565956 126.80935865 59.97546057 129.50183105 63.83467102 C130.47607334 66.70327332 131.0453986 69.30248195 131.56433105 72.27217102 C132.14231691 75.37185321 132.55736066 77.04167893 134.31433105 79.70967102 C137.52984437 81.70850362 139.84419728 82.14717102 143.62683105 82.14717102 C146.42872551 80.3807593 148.14208016 79.1166728 149.62683105 76.14717102 C150.49381171 66.78377993 147.59181353 58.28583168 142.00183105 50.77217102 C135.23328459 42.97770809 126.75224416 38.8547111 116.62683105 37.14717102 C104.07418821 36.56908878 93.73336423 41.40452285 85.25183105 50.52217102 Z "
        fill="#000000"
        transform="translate(197.3731689453125,81.85282897949219)"
      />
      <path
        d="M0 0 C-2.67107397 8.01322191 -15.86060714 13.26425752 -23.08203125 17.05664062 C-52.41679449 31.4850425 -86.31511336 32.36103652 -117 22 C-125.03645382 19.14202545 -132.32262704 15.40189553 -139.5625 10.9375 C-140.56337646 10.32032104 -140.56337646 10.32032104 -141.58447266 9.69067383 C-145.55966691 7.15194954 -148.78929429 4.45720902 -152 1 C-108.10929372 -17.51723524 -44.81921637 -11.90768848 0 0 Z "
        fill="#000000"
        transform="translate(332,429)"
      />
      <path
        d="M0 0 C1.15680267 0.00212242 1.15680267 0.00212242 2.3369751 0.00428772 C4.79239838 0.00987091 7.24772942 0.0224203 9.703125 0.03515625 C11.37109243 0.04017342 13.03906129 0.04473595 14.70703125 0.04882812 C18.78909787 0.05983484 22.87109581 0.07708789 26.953125 0.09765625 C26.81092529 1.02312256 26.66872559 1.94858887 26.5222168 2.90209961 C25.27021116 11.54549022 24.66811369 19.90979905 24.765625 28.66015625 C24.76626953 29.76294922 24.76691406 30.86574219 24.76757812 32.00195312 C24.80989371 40.0654237 25.29495144 48.06248554 25.953125 56.09765625 C19.95746546 56.17206302 13.96207742 56.22637987 7.96606445 56.26245117 C5.92825638 56.27749572 3.89048046 56.29793637 1.8527832 56.32397461 C-1.08390256 56.36054872 -4.02015851 56.37742624 -6.95703125 56.390625 C-7.86147476 56.40610886 -8.76591827 56.42159271 -9.69776917 56.43754578 C-16.01802706 56.43921034 -21.11610062 55.71900624 -26.0078125 51.34375 C-26.47445312 50.74691406 -26.94109375 50.15007812 -27.421875 49.53515625 C-27.90398437 48.93574219 -28.38609375 48.33632813 -28.8828125 47.71875 C-32.09346295 43.24754216 -31.27072984 38.22742822 -31.296875 32.91015625 C-31.3175 31.88083984 -31.338125 30.85152344 -31.359375 29.79101562 C-31.40479369 20.92869458 -29.38899231 15.01245052 -23.92578125 7.9609375 C-17.2959255 1.38621568 -8.92070709 -0.06180698 0 0 Z "
        fill="#000000"
        transform="translate(95.046875,300.90234375)"
      />
      <path
        d="M0 0 C4.78306186 -0.09992737 9.56549757 -0.17195954 14.34936523 -0.21972656 C15.97186893 -0.23966813 17.59430242 -0.26683174 19.21655273 -0.30175781 C30.04929069 -0.52890125 40.26057767 -0.52647991 49.375 6.25 C57.20150633 14.4491971 58.20995079 21.38172503 58.3125 32.375 C58.34150391 33.40367187 58.37050781 34.43234375 58.40039062 35.4921875 C58.45225887 41.6844584 58.15211288 45.30035575 54 50 C47.69905605 55.81625595 42.33591434 56.288188 34.10546875 56.1953125 C33.15811356 56.1924826 32.21075836 56.18965271 31.23469543 56.18673706 C28.21883334 56.17557187 25.20327184 56.15047389 22.1875 56.125 C20.13867617 56.11496547 18.08984768 56.10584045 16.04101562 56.09765625 C11.02722852 56.07564449 6.01366517 56.04113971 1 56 C1.07001221 55.13874512 1.14002441 54.27749023 1.2121582 53.39013672 C1.83599688 45.28961085 2.18251623 37.2485461 2.1875 29.125 C2.19974609 28.08214844 2.21199219 27.03929687 2.22460938 25.96484375 C2.24064742 17.18668691 1.22996104 8.67314172 0 0 Z "
        fill="#000000"
        transform="translate(390,301)"
      />
      <path
        d="M0 0 C5.93264263 5.77230094 9.16752135 12.57877627 9.37890625 20.84765625 C8.96503198 29.76476557 6.05748591 37.03017564 -0.5 43.1875 C-8.2603676 49.30347744 -15.89995932 50.32950816 -25.6875 49.25 C-33.5015224 47.08719023 -39.47758735 42.69573676 -43.5 35.625 C-47.39200435 28.24404677 -47.90767713 20.57908687 -46.0390625 12.41796875 C-43.58708523 5.59644223 -39.77135724 0.5476075 -33.41015625 -3.03125 C-21.34294449 -8.6532455 -10.93765546 -7.12219425 0 0 Z "
        fill="#000000"
        transform="translate(448.6875,444.75)"
      />
      <path
        d="M0 0 C6.08215746 5.36054556 9.49409721 11.01685755 10.3125 19.078125 C10.64553955 28.02856286 8.94704502 35.80306381 2.71875 42.58203125 C-4.41527749 48.46760393 -11.85271313 50.89246724 -21.03125 50.37890625 C-29.60123552 49.28510547 -35.24452693 45.46924237 -41 39 C-45.44697069 32.31732701 -46.8070046 24.24552989 -45.59375 16.359375 C-43.61068242 8.66318417 -39.75447689 2.5924078 -33.125 -1.875 C-22.23397921 -7.96903054 -10.29724658 -7.08703172 0 0 Z "
        fill="#000000"
        transform="translate(100,444)"
      />
      <path
        d="M0 0 C4.17283902 0.49064203 8.31364959 1.03301679 12.453125 1.75390625 C30.7264929 4.88702745 47.55012927 4.53973882 65.78710938 1.36376953 C69.18037777 0.80596173 72.58500285 0.40153505 76 0 C74.23912562 14.57355245 70.87736658 27.24434953 58.94140625 36.6796875 C49.77747514 42.9118982 39.73401136 43.13057365 29 42 C20.7064572 40.38617917 14.4562863 35.28556643 9 29 C3.35502234 20.59789641 0 10.16541285 0 0 Z "
        fill="#000000"
        transform="translate(218,470)"
      />
      <path
        d="M0 0 C0 23.76 0 47.52 0 72 C-10.06517959 70.32247007 -17.09295411 65.25411213 -23 57 C-28.47656092 49.10276481 -29.83361064 38.62388576 -28.4375 29.25 C-25.98102858 18.72888655 -20.69601998 10.42730269 -11.625 4.4296875 C-3.93 0 -3.93 0 0 0 Z "
        fill="#000000"
        transform="translate(92,110)"
      />
      <path
        d="M0 0 C11.53486865 4.19449769 18.73388341 8.41267476 25.0625 18.8828125 C29.20296359 28.23335945 29.98763644 40.79426218 26.4375 50.5 C21.43780353 60.77909625 13.87749796 68.21575718 3 72 C2.01 72 1.02 72 0 72 C0 48.24 0 24.48 0 0 Z "
        fill="#000000"
        transform="translate(420,110)"
      />
      <path
        d="M0 0 C1.05026367 -0.0038269 2.10052734 -0.00765381 3.18261719 -0.01159668 C5.40170247 -0.01431696 7.62081974 -0.00694777 9.83984375 0.00976562 C13.23770595 0.03117255 16.63345361 0.00996675 20.03125 -0.015625 C22.18750467 -0.01298175 24.34375802 -0.00785682 26.5 0 C27.51674805 -0.00809692 28.53349609 -0.01619385 29.58105469 -0.02453613 C36.56979118 0.06843711 36.56979118 0.06843711 39.92285156 2.34985352 C41.25 4.53125 41.25 4.53125 41.234375 7.96484375 C40.18544458 11.7651353 39.06565392 13.63950251 36.5 16.59375 C35.69949219 17.52058594 34.89898437 18.44742187 34.07421875 19.40234375 C33.135467 20.44770239 32.19384523 21.49048791 31.25 22.53125 C30.70037598 23.1411377 30.15075195 23.75102539 29.58447266 24.37939453 C17.98474959 37.20082151 17.98474959 37.20082151 13.625 38.03125 C3.8507624 36.5832148 -3.75555854 23.77748491 -9.75 16.53125 C-10.50796875 15.63792969 -11.2659375 14.74460937 -12.046875 13.82421875 C-14.37030886 10.6961094 -14.75 8.4016736 -14.75 4.53125 C-11.37236792 -1.0170074 -5.79254267 -0.0461292 0 0 Z "
        fill="#000000"
        transform="translate(242.75,319.46875)"
      />
      <path
        d="M0 0 C0 16.17 0 32.34 0 49 C-6.27 49 -12.54 49 -19 49 C-19 33.16 -19 17.32 -19 1 C-3 0 -3 0 0 0 Z "
        fill="#000000"
        transform="translate(439,373)"
      />
      <path
        d="M0 0 C6.27 0.33 12.54 0.66 19 1 C19 16.84 19 32.68 19 49 C12.73 49 6.46 49 0 49 C0 32.83 0 16.66 0 0 Z "
        fill="#000000"
        transform="translate(73,373)"
      />
    </svg>
  );
}