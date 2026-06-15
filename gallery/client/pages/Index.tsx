import { useState } from "react";

/* ─── SVG Components ─── */

const LogoSmall = () => (
  <svg width="124" height="20" viewBox="0 0 124 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M116.207 19.6757C113.979 19.6757 112.191 18.9929 110.843 17.6273C109.513 16.2437 108.849 14.4828 108.849 12.3445C108.849 10.2601 109.504 8.52614 110.816 7.14255C112.146 5.75896 113.853 5.06717 115.937 5.06717C117.824 5.06717 119.396 5.64217 120.654 6.79216C122.307 8.30153 123.116 10.5386 123.08 13.5035H113.161C113.305 14.4558 113.637 15.2015 114.158 15.7406C114.679 16.2617 115.38 16.5222 116.261 16.5222C117.393 16.5222 118.156 16.064 118.552 15.1476H122.837C122.514 16.4773 121.741 17.5644 120.519 18.4089C119.315 19.2535 117.878 19.6757 116.207 19.6757ZM113.188 10.889H118.633C118.561 10.0625 118.282 9.40661 117.797 8.92145C117.33 8.4363 116.737 8.19372 116.018 8.19372C114.455 8.19372 113.512 9.09216 113.188 10.889Z" fill="black"/>
    <path d="M99.4141 19.2714V5.47146H103.619V7.62771H103.7C104.634 6.04646 105.892 5.25584 107.473 5.25584C107.886 5.25584 108.174 5.29177 108.336 5.36365V9.13708H108.228C106.862 8.93942 105.784 9.182 104.993 9.86481C104.203 10.5297 103.807 11.5988 103.807 13.0722V19.2714H99.4141Z" fill="black"/>
    <path d="M91.0701 19.6757C88.842 19.6757 87.0541 18.9929 85.7064 17.6273C84.3768 16.2437 83.7119 14.4828 83.7119 12.3445C83.7119 10.2601 84.3678 8.52614 85.6795 7.14255C87.0092 5.75896 88.7162 5.06717 90.8006 5.06717C92.6873 5.06717 94.2595 5.64217 95.5173 6.79216C97.1705 8.30153 97.9791 10.5386 97.9431 13.5035H88.0244C88.1682 14.4558 88.5006 15.2015 89.0217 15.7406C89.5428 16.2617 90.2435 16.5222 91.124 16.5222C92.256 16.5222 93.0197 16.064 93.415 15.1476H97.7005C97.3771 16.4773 96.6045 17.5644 95.3826 18.4089C94.1787 19.2535 92.7412 19.6757 91.0701 19.6757ZM88.0514 10.889H93.4959C93.424 10.0625 93.1455 9.40661 92.6603 8.92145C92.1931 8.4363 91.6002 8.19372 90.8814 8.19372C89.3182 8.19372 88.3748 9.09216 88.0514 10.889Z" fill="black"/>
    <path d="M68.96 19.2714V0H73.3533V7.16951H73.4342C74.4943 5.76795 75.8599 5.06717 77.531 5.06717C79.0224 5.06717 80.1904 5.55233 81.0349 6.52264C81.8974 7.47498 82.3287 8.73279 82.3287 10.2961V19.2714H77.9353V11.1855C77.9353 10.4308 77.7467 9.83786 77.3693 9.40661C77.0099 8.95739 76.4799 8.73279 75.7791 8.73279C75.0603 8.73279 74.4764 9.00232 74.0271 9.54138C73.5779 10.0804 73.3533 10.7812 73.3533 11.6437V19.2714H68.96Z" fill="black"/>
    <path d="M50.9767 19.2714L46.7451 5.47147H51.2193L52.7287 11.1855L53.3486 13.8539H53.4025C53.6181 12.7937 53.8248 11.8773 54.0224 11.1047L55.4779 5.47147H59.1974L60.7068 11.1047L61.3537 13.8808H61.4076C61.6412 12.8207 61.8568 11.9222 62.0544 11.1855L63.5908 5.47147H67.9302L63.6986 19.2714H59.5748L57.9576 13.0183L57.3646 10.5386H57.3107C57.0951 11.473 56.8884 12.2996 56.6908 13.0183L55.0467 19.2714H50.9767Z" fill="black"/>
    <path d="M40.2818 19.6218C38.2514 19.6218 36.6611 18.948 35.5111 17.6003C34.3611 16.2347 33.7861 14.4738 33.7861 12.3175C33.7861 10.1972 34.3701 8.45427 35.5381 7.08864C36.706 5.70505 38.2424 5.01326 40.147 5.01326C41.2252 5.01326 42.1595 5.2199 42.9502 5.63318C43.7588 6.04646 44.3877 6.62146 44.8369 7.35817C45.2861 8.09489 45.6095 8.90348 45.8072 9.78395C46.0228 10.6464 46.1306 11.5898 46.1306 12.614H35.5111C35.5471 14.2671 35.9693 15.6148 36.7779 16.657C37.5865 17.6812 38.7545 18.1933 40.2818 18.1933C42.4021 18.1933 43.7588 17.1511 44.3517 15.0667H45.9689C45.6634 16.4683 45.0166 17.5824 44.0283 18.4089C43.058 19.2175 41.8092 19.6218 40.2818 19.6218ZM35.5381 11.2933H44.3787C44.3427 9.83786 43.9654 8.66091 43.2467 7.76247C42.5459 6.84607 41.5127 6.38787 40.147 6.38787C38.7994 6.38787 37.7303 6.83708 36.9396 7.73552C36.167 8.63395 35.6998 9.81989 35.5381 11.2933Z" fill="black"/>
    <path d="M27.1 19.6488C25.3031 19.6488 23.9105 19.2175 22.9223 18.355C21.952 17.4925 21.4219 16.3515 21.332 14.932H23.0301C23.2637 17.1242 24.6293 18.2203 27.1269 18.2203C28.259 18.2203 29.1304 17.9777 29.7414 17.4925C30.3523 17.0074 30.6578 16.3515 30.6578 15.5249C30.6578 14.7703 30.3972 14.2132 29.8761 13.8539C29.373 13.4945 28.3937 13.1531 26.9383 12.8296C26.0937 12.632 25.4199 12.4523 24.9168 12.2906C24.4137 12.1289 23.8926 11.9043 23.3535 11.6168C22.8324 11.3113 22.4461 10.9339 22.1945 10.4847C21.9609 10.0175 21.8441 9.46051 21.8441 8.81364C21.8441 7.66364 22.2934 6.74724 23.1918 6.06443C24.0902 5.38162 25.2582 5.04021 26.6957 5.04021C29.7863 5.04021 31.5113 6.41482 31.8707 9.16403H30.1996C30.0019 7.33122 28.834 6.41482 26.6957 6.41482C25.6535 6.41482 24.8629 6.63044 24.3238 7.06169C23.7848 7.49294 23.5152 8.04997 23.5152 8.73278C23.5152 9.4695 23.8027 9.99957 24.3777 10.323C24.9527 10.6285 25.9949 10.9609 27.5043 11.3203C29.1574 11.6617 30.3703 12.1199 31.1429 12.6949C31.9336 13.2519 32.3289 14.1863 32.3289 15.498C32.3289 16.7558 31.8527 17.762 30.9004 18.5167C29.966 19.2714 28.6992 19.6488 27.1 19.6488Z" fill="black"/>
    <path d="M17.6699 19.2714V0H19.341V19.2714H17.6699Z" fill="black"/>
    <path d="M9.66951 19.6218C7.63905 19.6218 6.04882 18.948 4.89882 17.6003C3.74883 16.2347 3.17383 14.4738 3.17383 12.3175C3.17383 10.1972 3.75781 8.45427 4.92578 7.08864C6.09374 5.70505 7.63006 5.01326 9.53475 5.01326C10.6129 5.01326 11.5472 5.2199 12.3379 5.63318C13.1465 6.04646 13.7754 6.62146 14.2246 7.35817C14.6738 8.09489 14.9972 8.90348 15.1949 9.78395C15.4105 10.6464 15.5183 11.5898 15.5183 12.614H4.89882C4.93476 14.2671 5.35702 15.6148 6.16562 16.657C6.97421 17.6812 8.14217 18.1933 9.66951 18.1933C11.7898 18.1933 13.1465 17.1511 13.7394 15.0667H15.3566C15.0511 16.4683 14.4043 17.5824 13.416 18.4089C12.4457 19.2175 11.1969 19.6218 9.66951 19.6218ZM4.92578 11.2933H13.7664C13.7304 9.83786 13.3531 8.66091 12.6343 7.76247C11.9336 6.84607 10.9004 6.38787 9.53475 6.38787C8.18709 6.38787 7.11796 6.83708 6.32733 7.73552C5.55468 8.63395 5.08749 9.81989 4.92578 11.2933Z" fill="black"/>
    <path d="M0 19.2714V16.9265H2.04843V19.2714H0Z" fill="black"/>
  </svg>
);

const LogoLarge = () => (
  <svg viewBox="0 0 1512 242" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M1427.55 241.71C1400.18 241.71 1378.22 233.322 1361.66 216.545C1345.33 199.549 1337.16 177.916 1337.16 151.648C1337.16 126.043 1345.22 104.741 1361.33 87.7444C1377.67 70.7475 1398.64 62.249 1424.24 62.249C1447.42 62.249 1466.73 69.3127 1482.19 83.4399C1502.49 101.982 1512.43 129.464 1511.99 165.886H1390.14C1391.9 177.585 1395.99 186.746 1402.39 193.368C1408.79 199.769 1417.4 202.97 1428.21 202.97C1442.12 202.97 1451.5 197.341 1456.36 186.083H1509.01C1505.03 202.418 1495.54 215.773 1480.53 226.148C1465.74 236.522 1448.08 241.71 1427.55 241.71ZM1390.47 133.768H1457.35C1456.47 123.614 1453.05 115.557 1447.09 109.597C1441.35 103.638 1434.06 100.658 1425.24 100.658C1406.03 100.658 1394.44 111.694 1390.47 133.768Z" fill="black"/>
    <path d="M1221.26 236.74V67.2123H1272.91V93.701H1273.91C1285.39 74.276 1300.84 64.5635 1320.26 64.5635C1325.34 64.5635 1328.87 65.005 1330.86 65.8879V112.243H1329.53C1312.76 109.815 1299.51 112.795 1289.8 121.183C1280.09 129.35 1275.23 142.484 1275.23 160.585V236.74H1221.26Z" fill="black"/>
    <path d="M1118.76 241.71C1091.39 241.71 1069.43 233.322 1052.87 216.545C1036.54 199.549 1028.37 177.916 1028.37 151.648C1028.37 126.043 1036.43 104.741 1052.54 87.7444C1068.87 70.7475 1089.84 62.249 1115.45 62.249C1138.63 62.249 1157.94 69.3127 1173.39 83.4399C1193.7 101.982 1203.63 129.464 1203.19 165.886H1081.35C1083.11 177.585 1087.2 186.746 1093.6 193.368C1100 199.769 1108.61 202.97 1119.42 202.97C1133.33 202.97 1142.71 197.341 1147.57 186.083H1200.21C1196.24 202.418 1186.75 215.773 1171.74 226.148C1156.95 236.522 1139.29 241.71 1118.76 241.71ZM1081.68 133.768H1148.56C1147.68 123.614 1144.26 115.557 1138.3 109.597C1132.56 103.638 1125.27 100.658 1116.44 100.658C1097.24 100.658 1085.65 111.694 1081.68 133.768Z" fill="black"/>
    <path d="M847.152 236.742V0H901.123V88.0748H902.116C915.14 70.8572 931.916 62.2483 952.445 62.2483C970.766 62.2483 985.114 68.2083 995.489 80.1282C1006.08 91.8273 1011.38 107.279 1011.38 126.483V236.742H957.411V137.41C957.411 128.139 955.094 120.854 950.458 115.557C946.043 110.038 939.532 107.279 930.923 107.279C922.093 107.279 914.919 110.59 909.401 117.212C903.882 123.834 901.123 132.443 901.123 143.039V236.742H847.152Z" fill="black"/>
    <path d="M626.232 236.744L574.248 67.2168H629.212L647.754 137.412L655.37 170.191H656.032C658.681 157.168 661.219 145.91 663.647 136.418L681.527 67.2168H727.22L745.762 136.418L753.709 170.523H754.371C757.241 157.499 759.889 146.462 762.317 137.412L781.191 67.2168H834.499L782.515 236.744H731.856L711.989 159.927L704.705 129.465H704.042C701.394 140.944 698.855 151.098 696.427 159.927L676.229 236.744H626.232Z" fill="black"/>
    <path d="M494.848 241.05C469.904 241.05 450.369 232.772 436.242 216.216C422.114 199.44 415.051 177.808 415.051 151.319C415.051 125.272 422.225 103.86 436.573 87.0842C450.921 70.0873 469.794 61.5889 493.192 61.5889C506.437 61.5889 517.915 64.1274 527.628 69.2044C537.561 74.2814 545.287 81.345 550.805 90.3953C556.324 99.4456 560.297 109.379 562.725 120.195C565.374 130.79 566.698 142.379 566.698 154.961H436.242C436.683 175.269 441.871 191.825 451.804 204.628C461.737 217.21 476.085 223.501 494.848 223.501C520.895 223.501 537.561 210.698 544.845 185.092H564.712C560.959 202.31 553.013 215.996 540.872 226.15C528.952 236.083 513.611 241.05 494.848 241.05ZM436.573 138.737H545.176C544.735 120.857 540.099 106.399 531.27 95.3619C522.661 84.1042 509.968 78.4754 493.192 78.4754C476.637 78.4754 463.503 83.9939 453.79 95.0308C444.299 106.068 438.559 120.637 436.573 138.737Z" fill="black"/>
    <path d="M332.913 241.381C310.839 241.381 293.732 236.083 281.591 225.487C269.671 214.892 263.159 200.875 262.056 183.437H282.915C285.785 210.367 302.561 223.832 333.244 223.832C347.15 223.832 357.856 220.852 365.361 214.892C372.867 208.932 376.619 200.875 376.619 190.721C376.619 181.45 373.418 174.607 367.017 170.192C360.836 165.777 348.806 161.583 330.926 157.61C320.551 155.182 312.274 152.975 306.093 150.988C299.912 149.001 293.511 146.242 286.889 142.71C280.487 138.958 275.741 134.322 272.651 128.804C269.782 123.065 268.347 116.222 268.347 108.275C268.347 94.1478 273.865 82.8901 284.902 74.502C295.939 66.114 310.287 61.9199 327.946 61.9199C365.913 61.9199 387.104 78.8064 391.519 112.579H370.99C368.562 90.0641 354.214 78.8064 327.946 78.8064C315.143 78.8064 305.431 81.4553 298.809 86.753C292.187 92.0508 288.875 98.8936 288.875 107.282C288.875 116.332 292.407 122.844 299.471 126.817C306.535 130.57 319.337 134.653 337.879 139.068C358.187 143.262 373.087 148.891 382.579 155.955C392.292 162.798 397.148 174.276 397.148 190.39C397.148 205.842 391.298 218.203 379.599 227.474C368.121 236.745 352.559 241.381 332.913 241.381Z" fill="black"/>
    <path d="M217.066 236.742V0H237.595V236.742H217.066Z" fill="black"/>
    <path d="M118.791 241.05C93.8477 241.05 74.3123 232.772 60.1851 216.216C46.0578 199.44 38.9941 177.808 38.9941 151.319C38.9941 125.272 46.1681 103.86 60.5162 87.0842C74.8642 70.0873 93.7374 61.5889 117.136 61.5889C130.38 61.5889 141.858 64.1274 151.571 69.2044C161.504 74.2814 169.23 81.345 174.749 90.3953C180.267 99.4456 184.24 109.379 186.668 120.195C189.317 130.79 190.642 142.379 190.642 154.961H60.1851C60.6265 175.269 65.8139 191.825 75.7472 204.628C85.6804 217.21 100.028 223.501 118.791 223.501C144.838 223.501 161.504 210.698 168.789 185.092H188.655C184.902 202.31 176.956 215.996 164.815 226.15C152.895 236.083 137.554 241.05 118.791 241.05ZM60.5162 138.737H169.12C168.678 120.857 164.043 106.399 155.213 95.3619C146.604 84.1042 133.912 78.4754 117.136 78.4754C100.58 78.4754 87.4463 83.9939 77.7338 95.0308C68.242 106.068 62.5028 120.637 60.5162 138.737Z" fill="black"/>
    <path d="M0 236.743V207.937H25.1642V236.743H0Z" fill="black"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#ig-clip)">
      <path d="M19.9805 5.88005C19.9336 4.81738 19.7618 4.0868 19.5156 3.45374C19.2616 2.78176 18.8709 2.18014 18.3591 1.68002C17.8589 1.1721 17.2533 0.777435 16.5891 0.527447C15.9524 0.281274 15.2257 0.109427 14.163 0.0625732C13.0924 0.0117516 12.7525 0 10.0371 0C7.32174 0 6.98186 0.0117516 5.91521 0.0586052C4.85253 0.105459 4.12195 0.277459 3.48905 0.523479C2.81692 0.777435 2.2153 1.16814 1.71517 1.68002C1.20726 2.18014 0.812743 2.78573 0.562603 3.44992C0.316431 4.0868 0.144583 4.81341 0.0977295 5.87609C0.0469078 6.9467 0.0351562 7.28658 0.0351562 10.002C0.0351562 12.7173 0.0469078 13.0572 0.0937615 14.1239C0.140615 15.1865 0.312615 15.9171 0.558788 16.5502C0.812743 17.2221 1.20726 17.8238 1.71517 18.3239C2.2153 18.8318 2.82089 19.2265 3.48508 19.4765C4.12195 19.7226 4.84857 19.8945 5.9114 19.9413C6.97789 19.9883 7.31792 19.9999 10.0333 19.9999C12.7487 19.9999 13.0885 19.9883 14.1552 19.9413C15.2179 19.8945 15.9485 19.7226 16.5814 19.4765C17.9255 18.9568 18.9881 17.8941 19.5078 16.5502C19.7538 15.9133 19.9258 15.1865 19.9727 14.1239C20.0195 13.0572 20.0313 12.7173 20.0313 10.002C20.0313 7.28658 20.0273 6.9467 19.9805 5.88005ZM18.1794 14.0457C18.1364 15.0225 17.9723 15.5499 17.8356 15.9015C17.4995 16.7728 16.808 17.4643 15.9367 17.8004C15.5851 17.9372 15.0538 18.1012 14.0809 18.1441C13.026 18.1911 12.7096 18.2027 10.0411 18.2027C7.37256 18.2027 7.05221 18.1911 6.00114 18.1441C5.02438 18.1012 4.49694 17.9372 4.1453 17.8004C3.71172 17.6402 3.31705 17.3862 2.9967 17.0541C2.66461 16.7298 2.41065 16.3391 2.2504 15.9055C2.11366 15.5539 1.94959 15.0225 1.90671 14.0497C1.8597 12.9948 1.8481 12.6783 1.8481 10.0097C1.8481 7.34122 1.8597 7.02087 1.90671 5.96995C1.94959 4.99319 2.11366 4.46575 2.2504 4.11412C2.41065 3.68038 2.66461 3.28586 3.00067 2.96536C3.32483 2.63327 3.71553 2.37931 4.14927 2.21921C4.5009 2.08247 5.03232 1.9184 6.0051 1.87537C7.06 1.82851 7.37653 1.81676 10.0449 1.81676C12.7174 1.81676 13.0338 1.82851 14.0848 1.87537C15.0616 1.9184 15.589 2.08247 15.9407 2.21921C16.3743 2.37931 16.7689 2.63327 17.0893 2.96536C17.4214 3.28967 17.6753 3.68038 17.8356 4.11412C17.9723 4.46575 18.1364 4.99701 18.1794 5.96995C18.2263 7.02484 18.238 7.34122 18.238 10.0097C18.238 12.6783 18.2263 12.9908 18.1794 14.0457Z" fill="black"/>
      <path d="M10.0371 4.86426C7.20074 4.86426 4.89941 7.16543 4.89941 10.002C4.89941 12.8385 7.20074 15.1397 10.0371 15.1397C12.8737 15.1397 15.1749 12.8385 15.1749 10.002C15.1749 7.16543 12.8737 4.86426 10.0371 4.86426ZM10.0371 13.3347C8.19703 13.3347 6.70442 11.8422 6.70442 10.002C6.70442 8.16172 8.19703 6.66927 10.0371 6.66927C11.8774 6.66927 13.3699 8.16172 13.3699 10.002C13.3699 11.8422 11.8774 13.3347 10.0371 13.3347Z" fill="black"/>
      <path d="M16.5777 4.66134C16.5777 5.3237 16.0406 5.86076 15.3781 5.86076C14.7158 5.86076 14.1787 5.3237 14.1787 4.66134C14.1787 3.99882 14.7158 3.46191 15.3781 3.46191C16.0406 3.46191 16.5777 3.99882 16.5777 4.66134Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="ig-clip">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#tw-clip)">
      <path d="M11.8616 8.46864L19.147 0H17.4206L11.0947 7.3532L6.04225 0H0.214844L7.85515 11.1193L0.214844 20H1.94134L8.62162 12.2348L13.9574 20H19.7848L11.8612 8.46864H11.8616ZM9.49695 11.2173L8.72283 10.1101L2.56342 1.29967H5.21521L10.1859 8.40994L10.9601 9.51718L17.4214 18.7594H14.7696L9.49695 11.2177V11.2173Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="tw-clip">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CloseIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M7.7877 0L0 7.78779" stroke="#9E9E9E" strokeWidth="0.861933"/>
    <path d="M0.000387208 3.8147e-06L7.78809 7.7878" stroke="#9E9E9E" strokeWidth="0.861933"/>
  </svg>
);

/* ─── Sub-components ─── */

function ArticleNote({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${align === "right" ? "items-end" : "items-start"}`}>
      <div className={`flex items-center gap-1.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <span className="font-montserrat text-sm md:text-base font-normal text-black">Notes |</span>
        <span className="font-montserrat text-sm md:text-base font-normal text-[#848484] uppercase">2 min read</span>
      </div>
      <p className={`font-dm-sans text-xl md:text-[28px] font-medium uppercase underline underline-offset-2 leading-tight ${align === "right" ? "text-right" : "text-left"}`}>
        The story was quite clear, to me
      </p>
    </div>
  );
}

function EditorialTitle({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <h2 className={`font-dm-sans text-xl md:text-[28px] font-medium uppercase leading-tight ${align === "right" ? "text-right" : "text-left"}`}>
      {children}
    </h2>
  );
}

function EditorialText({
  title,
  desc,
  align = "left",
}: {
  title: string;
  desc?: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`flex flex-col gap-1 ${align === "right" ? "items-end" : "items-start"}`}>
      <EditorialTitle align={align}>{title}</EditorialTitle>
      {desc && (
        <p className={`font-montserrat text-sm md:text-base font-normal text-black leading-normal max-w-[360px] ${align === "right" ? "text-right" : "text-left"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

function MusicWidget() {
  return (
    <div className="mt-4 flex flex-col items-center gap-1">
      <svg width="160" height="118" viewBox="0 0 160 118" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect x="14.5156" y="-0.142334" width="119.266" height="117.958" fill="url(#mw-pattern)"/>
        <path d="M31.5597 59.8796L39.0391 55.2682V64.4911L31.5597 59.8796Z" fill="white"/>
        <path d="M29.8419 55.2682H32.1992V64.4911H29.8419V55.2682Z" fill="white"/>
        <path d="M78.5896 59.8796L69.707 54.4031V65.3562L78.5896 59.8796Z" fill="white"/>
        <path d="M116.738 59.8796L109.259 55.2682V64.4911L116.738 59.8796Z" fill="white"/>
        <path d="M118.456 55.2682H116.099V64.4911H118.456V55.2682Z" fill="white"/>
        <path d="M155.523 45.172C157.037 39.7107 153.838 34.0558 148.376 32.5415C142.915 31.0271 137.26 34.2267 135.746 39.688C134.232 45.1493 137.431 50.8042 142.892 52.3185C148.354 53.8329 154.009 50.6333 155.523 45.172Z" fill="#848484"/>
        <path d="M139.368 50.8182C134.744 47.3643 133.793 40.7926 137.247 36.1688C140.701 31.5451 147.272 30.5929 151.896 34.0468C156.52 37.5007 157.472 44.0725 154.018 48.6965C150.564 53.3205 143.992 54.2721 139.368 50.8182ZM151.65 34.3765C147.208 31.0586 140.895 31.9728 137.576 36.4151C134.258 40.8575 135.172 47.1707 139.614 50.4887C144.057 53.807 150.37 52.8926 153.688 48.4504C157.006 44.008 156.092 37.6948 151.65 34.3765Z" fill="#231F20"/>
        <path d="M151.075 49.3991C154.924 46.3947 155.608 40.8392 152.604 36.9905C149.599 33.1418 144.044 32.4574 140.195 35.4617C136.347 38.466 135.662 44.0215 138.666 47.8702C141.671 51.7189 147.226 52.4034 151.075 49.3991Z" fill="#231F20"/>
        <path d="M146.759 50.2128C151.056 49.5904 154.035 45.6025 153.412 41.3055C152.79 37.0085 148.802 34.0296 144.505 34.6519C140.208 35.2743 137.229 39.2622 137.851 43.5592C138.474 47.8562 142.462 50.8351 146.759 50.2128Z" fill="#848484"/>
        <path d="M103.382 86.1582L100.603 84.0828L108.787 73.1268C109.336 72.3917 110.123 71.869 111.013 71.6473L122.891 68.6884C123.801 68.4617 124.602 67.9204 125.152 67.1607L149.645 33.3252C150.377 32.3105 151.799 32.0926 152.801 32.8416C153.799 33.5866 153.997 35.0019 153.243 35.9926L127.034 70.4923C126.485 71.2141 125.707 71.7271 124.827 71.946L112.899 74.9176C112.009 75.1394 111.222 75.662 110.673 76.3972L103.382 86.1582Z" fill="#848484"/>
        <path d="M95.9147 96.8728L92.2528 94.1376C91.2792 93.4105 91.0777 92.0189 91.8048 91.0454L98.5021 82.0796C99.2292 81.1061 100.621 80.9046 101.594 81.6317L105.256 84.367C106.23 85.0941 106.431 86.4856 105.704 87.4591L99.0068 96.4249C98.2797 97.3985 96.8882 97.6002 95.9147 96.8728Z" fill="#474747"/>
        <path d="M148.941 48.6214C152.358 46.7952 153.647 42.5448 151.821 39.128C149.995 35.7111 145.744 34.4216 142.327 36.2478C138.911 38.074 137.621 42.3243 139.447 45.7412C141.273 49.1581 145.524 50.4476 148.941 48.6214Z" fill="black"/>
        <defs>
          <pattern id="mw-pattern" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#mw-img" transform="matrix(0.000491754 0 0 0.000497208 -0.111153 -0.12151)"/>
          </pattern>
        </defs>
      </svg>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-montserrat text-[11px] uppercase text-[#1C1C1C] text-center">Angel (feat. horace andy)</span>
        <span className="font-montserrat text-[11px] text-[#1C1C1C] text-center">Massive Attack . Mezzanine</span>
      </div>
    </div>
  );
}

/* ─── Gallery Group ─── */

interface GalleryImages {
  centerPortrait: string;
  leftPortrait: string;
  rightPortrait1: string;
  centerLandscape: string;
  leftLandscape: string;
  rightPortrait2: string;
  rightLandscape: string;
  smallLeftLandscape: string;
}

function GalleryGroup({
  images,
  showMusicWidget = false,
  flip = false,
}: {
  images: GalleryImages;
  showMusicWidget?: boolean;
  flip?: boolean;
}) {
  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28">
      {/* Row 1: Article note + center portrait + text right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start">
        <div className="md:col-span-3 md:col-start-1 md:pt-4">
          <ArticleNote align={flip ? "right" : "left"} />
        </div>
        <div className="md:col-span-3 md:col-start-5">
          <img
            src={images.centerPortrait}
            alt=""
            className="w-full object-cover aspect-[274/376]"
          />
        </div>
        <div className={`md:col-span-4 md:col-start-9 md:pt-10 ${flip ? "md:col-start-1 md:row-start-1" : ""}`}>
          <EditorialText
            title="Lorem ipsum"
            desc="Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur."
            align={flip ? "right" : "left"}
          />
        </div>
      </div>

      {/* Row 2: Portrait left + title + portrait right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start">
        <div className="md:col-span-3 md:col-start-1">
          <img
            src={images.leftPortrait}
            alt=""
            className="w-full object-cover aspect-[288/395]"
          />
        </div>
        <div className="md:col-span-5 md:col-start-4 flex flex-col justify-start md:pt-6">
          <EditorialTitle align="right">
            Lorem ipsum dolor sit amet consectetur.
          </EditorialTitle>
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <img
            src={images.rightPortrait1}
            alt=""
            className="w-full object-cover aspect-[288/395]"
          />
          {showMusicWidget && (
            <div className="hidden xl:block mt-4">
              <MusicWidget />
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Text block centered */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 md:col-start-4">
          <EditorialText
            title="Lorem ipsum dolor sit amet consectetur."
            desc="Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur."
            align="left"
          />
        </div>
      </div>

      {/* Row 4: Title left + landscape right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center">
        <div className="md:col-span-3 md:col-start-2">
          <EditorialTitle align="right">
            Lorem ipsum dolor sit amet consectetur.
          </EditorialTitle>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <img
            src={images.centerLandscape}
            alt=""
            className="w-full object-cover aspect-[520/298]"
          />
        </div>
      </div>

      {/* Row 5: Landscape left + title+desc + article note right + portrait right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start">
        <div className="md:col-span-5 md:col-start-1">
          <img
            src={images.leftLandscape}
            alt=""
            className="w-full object-cover aspect-[520/298]"
          />
        </div>
        <div className="md:col-span-3 md:col-start-7 md:pt-2">
          <EditorialText
            title="Lorem ipsum dolor sit amet consectetur."
            desc="Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur."
            align="left"
          />
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <ArticleNote align="right" />
          <img
            src={images.rightPortrait2}
            alt=""
            className="w-full object-cover aspect-[288/395] mt-4"
          />
        </div>
      </div>

      {/* Row 6: Text+landscape left, title right+landscape right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start">
        <div className="md:col-span-5 md:col-start-1 flex flex-col gap-6">
          <img
            src={images.smallLeftLandscape}
            alt=""
            className="w-full object-cover aspect-[469/240]"
          />
          <div className="flex justify-end">
            <EditorialText
              title="Lorem ipsum dolor sit amet consectetur."
              desc="Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur."
              align="right"
            />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:mt-20">
          <EditorialTitle align="left">
            Lorem ipsum dolor sit amet consectetur.
          </EditorialTitle>
          <img
            src={images.rightLandscape}
            alt=""
            className="w-full object-cover aspect-[520/298] mt-4"
          />
          <div className="mt-4 flex justify-end">
            <EditorialText
              title="Lorem ipsum dolor sit amet consectetur."
              desc="Lorem ipsum dolor sit amet consectetur. dolor sit amet consectetur."
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function Index() {
  const [viewMode, setViewMode] = useState<"all" | "photos" | "videos">("all");
  const [activeFilters, setActiveFilters] = useState<string[]>(["culture", "adventure"]);

  const removeFilter = (filter: string) =>
    setActiveFilters((prev) => prev.filter((f) => f !== filter));

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] font-montserrat">
      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-[1512px] mx-auto px-5 md:px-10 lg:px-20 py-[30px] flex items-end justify-between">
          <LogoSmall />
          <div className="flex items-center gap-6 md:gap-10">
            <span className="hidden md:block font-montserrat font-bold text-base uppercase tracking-wide text-[#1C1C1C]">
              gallery
            </span>
            <button className="flex items-center gap-1.5 font-montserrat font-medium text-base uppercase text-[#1C1C1C] hover:opacity-70 transition-opacity">
              Menu
              <span className="w-[8.4px] h-[8.4px] border border-[#1C1C1C] inline-block" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="pt-[88px] md:pt-[92px]">
        {/* Filter Bar */}
        <div className="max-w-[1512px] mx-auto px-5 md:px-10 lg:px-20 mb-10 md:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <span className="font-montserrat font-semibold text-sm md:text-base uppercase text-[#1C1C1C]">
                Filter
              </span>
              <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                {activeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-1.5 font-montserrat text-sm md:text-base uppercase text-[#1C1C1C] hover:opacity-60 transition-opacity"
                  >
                    <CloseIcon />
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              {(["all", "photos", "videos"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`font-montserrat text-sm md:text-base uppercase transition-all ${
                    viewMode === mode
                      ? "font-bold text-[#1C1C1C]"
                      : "font-normal text-[#797979]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        <div className="max-w-[1512px] mx-auto px-5 md:px-10 lg:px-20 space-y-24 md:space-y-32 lg:space-y-48">
          <GalleryGroup
            showMusicWidget
            images={{
              centerPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/978ac27f6749e878cb0ba149068551323b635fff?width=548",
              leftPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/db807c0483745d909a2d681ec2a02bcff8d2b5b6?width=576",
              rightPortrait1:
                "https://api.builder.io/api/v1/image/assets/TEMP/c0fd04409b6a36cd2c326bb0ff6c26e201528c64?width=576",
              centerLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/b8d4c14ac400891338287c2561bb7e556bcc0a7e?width=1040",
              leftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/fea8d9f10b60330dedee96d97854ada03aee9b7e?width=1040",
              rightPortrait2:
                "https://api.builder.io/api/v1/image/assets/TEMP/db807c0483745d909a2d681ec2a02bcff8d2b5b6?width=576",
              rightLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/b2db7c882bd193f223e1734eecd15547fa1e44d6?width=1040",
              smallLeftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/d315b44bd90386aaf56f5f3b758b56a170475498?width=938",
            }}
          />

          <GalleryGroup
            flip
            images={{
              centerPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/1e7a56578e796c1c6050b123861e52443a9f758c?width=548",
              leftPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/38ad23589c2a30aff3b14d6d0193e6aaafe68a00?width=432",
              rightPortrait1:
                "https://api.builder.io/api/v1/image/assets/TEMP/c1789dbe0c295e3a7afbe0b487a8bee826ba6fdd?width=576",
              centerLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/f52a1d5dfadc240ca27dab1b34c75deb05edefc4?width=626",
              leftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/20bc1ff0dbefbe374f4645d60838af0824c51fd5?width=1040",
              rightPortrait2:
                "https://api.builder.io/api/v1/image/assets/TEMP/c1789dbe0c295e3a7afbe0b487a8bee826ba6fdd?width=576",
              rightLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/b2db7c882bd193f223e1734eecd15547fa1e44d6?width=1040",
              smallLeftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/e033c505ffc647771cc2b9b6148ac092a041c621?width=902",
            }}
          />

          <GalleryGroup
            images={{
              centerPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/978ac27f6749e878cb0ba149068551323b635fff?width=548",
              leftPortrait:
                "https://api.builder.io/api/v1/image/assets/TEMP/38ad23589c2a30aff3b14d6d0193e6aaafe68a00?width=432",
              rightPortrait1:
                "https://api.builder.io/api/v1/image/assets/TEMP/69c11ff54ef645c7bbc978a80d3169d20f58e582?width=576",
              centerLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/2feefb85695b3bc0dc705a7a15bca5c5b859117d?width=1040",
              leftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/fea8d9f10b60330dedee96d97854ada03aee9b7e?width=1040",
              rightPortrait2:
                "https://api.builder.io/api/v1/image/assets/TEMP/69c11ff54ef645c7bbc978a80d3169d20f58e582?width=576",
              rightLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/b2db7c882bd193f223e1734eecd15547fa1e44d6?width=1040",
              smallLeftLandscape:
                "https://api.builder.io/api/v1/image/assets/TEMP/d315b44bd90386aaf56f5f3b758b56a170475498?width=938",
            }}
          />
        </div>

        {/* ── Footer ── */}
        <footer className="mt-24 md:mt-40">
          <div className="flex flex-col gap-10 md:gap-16 pb-0">
            {/* Large wordmark */}
            <div className="w-full overflow-hidden">
              <LogoLarge />
            </div>
            {/* Social + Copyright */}
            <div className="max-w-[1512px] mx-auto w-full px-5 md:px-10 lg:px-20 pb-10 md:pb-16 flex items-center justify-between">
              <div className="flex items-center gap-8 md:gap-10">
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter">
                  <TwitterIcon />
                </a>
              </div>
              <span className="font-montserrat text-base font-normal text-black">
                @Copywrite
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
