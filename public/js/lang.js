function selectLanguage() {
    const selectedLanguage = prompt("Please enter your preferred language (e.g., 'en' for English, 'hi' for Hindi):");
  
    if (selectedLanguage) {

      if (selectedLanguage === 'en') {

        changeLanguage('en');
      } else if (selectedLanguage === 'hi') {

        changeLanguage('hi');
      } else {
        alert("Language not supported or invalid entry.");
      }
    }
  }
  
  function changeLanguage(language) {

    if (language === 'en') {
      document.body.innerHTML = `
      <div class="main">
      <div class="nav1">
          <img src="Emblem1.jpg">
          <div class="nav-items">
              <i class="fa-solid fa-house"></i>
              <a href="homepage.html">Home</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-tag"></i>
              <a href="####">Parties & Symbols</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-newspaper"></i>
              <a href="####">News</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-user"></i>
              <a href="####">About us</a>
          </div>
      </div>
      <div class="marque"><marquee behavior="alternate" direction="left">The site will not be accessible between 00:00 hrs to 01:00 hrs on every Sunday, due to maintenance activity.</marquee>
      </div>
      <div class="banner">
          <img src="goi.jpeg">
      </div>
      <div class="nav2">
          <div class="nav-items1">
              <i class="fa-solid fa-house"></i>
              <a href="homepage.html">Home</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-tag"></i>
              <a href="####">Parties & Symbols</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-newspaper"></i>
              <a href="####">News</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-user"></i>
              <a href="####">About us</a>
          </div>
      </div>
  </div>
  <div class="page2">
      <div class="content">
          <div class="guidelines">
              <h1>Guidelines</h1>
              <ul>
                  <li> To eliminate paper in the voting process. This involves sending of notices and ballot papers and receiving the said ballot votes.</li>
                  <li> Facilitate electronic voting on resolutions of companies in a fair and transparent manner for all classes of security/stakeholders.</li>
                  <li> Enable security holders to vote at a time and place of their convenience.</li>
                  <li> Eliminate postal and other natural delays which cause a hindrance to postal ballot.</li>
                  <li> Increase shareholder participation in shareholder meetings.</li>
              </ul>
          </div>
          <div class="faq">
              <h1>Frequently Asked Questions</h1>
              <p>Learn about the voting process:</p>
              <ul>
                  <li>How to register for voting?</li>
                  <li>What documents are required for voter registration?</li>
                  <li>How to cast your vote electronically?</li>
                  <li>Why is voting important for democracy?</li>
              </ul>
          </div>
          <div class="sidebar">
              <a class="register" href="/register" role="button">Registration</a>
              <a class="login" href="/login" role="button">Login here</a>
              <a class="voter-id" href="https://eci.gov.in/voter/voter-registration/" role="button">Apply For voter-id Card</a>
              <a class="givevote" href="/givevote" role="button">Give Vote</a>
          </div>
      </div>
  </div>
  <div class="page3">
      <div class="policy">
          <div class="contact">
              <h3>Contact Us</h3>
              <button>Toll Free: 1947</button><br>
              <button>help@eci.gov.in</button>
          </div>
          <h2>Government of India</h2>
          <a href="https://www.india.gov.in/">National Portal of India</a><br>
          <a href="https://www.mygov.in/">MyGov</a><br>
          <a href="https://digitalindia.gov.in/">Digital India</a><br>
          <a href="https://www.gst.gov.in/">GST.gov.in</a><br>
          <a href="https://dbtbharat.gov.in/">DBT Bharat</a>
          <div class="footer">
              <h3>Follow Us:</h3>
              <div class="social_media">
                  <ul>
                      <a href="#"><i class="fa-brands fa-facebook"></i></a>
                      <a href="#"><i class="fa-brands fa-twitter"></i></a>
                      <a href="#"><i class="fa-brands fa-instagram"></i></a>
                      <a href="#"><i class="fa-brands fa-youtube"></i></a>
                  </ul>
              </div>
              <h3>To Collaborate, email to us:</h3>
                  <h5>anshikatiwari027@gmail.com</h5>
                  <h5>rupsy1234@gmail.com</h5>
                  <h5>mohitaman4321@gmail.com</h5>
              <p>© Copyright 2023 : DISCLAIMER: All information provided in Citizen-Choice is obtained by NSDL from sources believed to be accurate and reliable</p>
          </div>
      </div>
  </div>
      `;
    } else if (language === 'hi') {
      document.body.innerHTML = `
      <div class="main">
      <div class="nav1">
          <img src="Emblem1.jpg">
          <div class="nav-items">
              <i class="fa-solid fa-house"></i>
              <a href="homepage.html">मुख्यपृष्ठ</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-tag"></i>
              <a href="####">दल और प्रतीक</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-newspaper"></i>
              <a href="####">समाचार</a>
          </div>
          <div class="nav-items">
              <i class="fa-solid fa-user"></i>
              <a href="####">हमारे बारे में</a>
          </div>
      </div>
      <div class="marque">
          <marquee behavior="alternate" direction="left">प्रत्येक रविवार को 00:00 बजे से 01:00 बजे तक, रखरखाव गतिविधि के कारण साइट का उपयोग नहीं किया जाएगा।</marquee>
      </div>
      <div class="banner">
          <img src="goi.jpeg">
      </div>
      <div class="nav2">
          <div class="nav-items1">
              <i class="fa-solid fa-house"></i>
              <a href="homepage.html">मुख्यपृष्ठ</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-tag"></i>
              <a href="####">दल और प्रतीक</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-newspaper"></i>
              <a href="####">समाचार</a>
          </div>
          <div class="nav-items1">
              <i class="fa-solid fa-user"></i>
              <a href="####">हमारे बारे में</a>
          </div>
      </div>
  </div>
  <div class="page2">
      <div class="content">
          <div class="guidelines">
              <h1>मार्गदर्शिकाएँ</h1>
              <ul>
                  <li>मतदान प्रक्रिया में कागज को हटाने के लिए। इसमें सूचनाओं और मतपत्रों को भेजना और उक्त मतपत्रों को प्राप्त करना शामिल है।</li>
                  <li>कंपनियों के संकल्पों पर इलेक्ट्रॉनिक मतदान को समर्थन करना, सभी प्रकार के सुरक्षा/ हिस्सेदारों के लिए निष्पक्ष और पारदर्शी तरीके से।</li>
                  <li>सुरक्षा स्थाधारियों को अपनी सुविधा के समय और स्थान पर मतदान करने की सुविधा प्रदान करना।</li>
                  <li>डाक और अन्य प्राकृतिक देरी को नकारना जो डाक मतपत्र को बाधित करने का कारण बनता है।</li>
                  <li>शेयरधारकों की सहभागिता को शेयरधारक सभाओं में बढ़ाना।</li>
              </ul>
          </div>
          <div class="faq">
              <h1>अक्सर पूछे जाने वाले प्रश्न</h1>
              <p>मतदान प्रक्रिया के बारे में जानें:</p>
              <ul>
                  <li>मतदान के लिए पंजीकरण कैसे करें?</li>
                  <li>मतदाता पंजीकरण के लिए कौन से दस्तावेज़ आवश्यक हैं?</li>
                  <li>इलेक्ट्रॉनिक रूप से अपना मत कैसे दे सकते हैं?</li>
                  <li>लोकतंत्र के लिए मतदान क्यों महत्वपूर्ण है?</li>
              </ul>
          </div>
          <div class="sidebar">
              <a class="register" href="/register" role="button">पंजीकरण</a>
              <a class="login" href="/login" role="button">यहां लॉग इन करें</a>
              <a class="voter-id" href="https://eci.gov.in/voter/voter-registration/" role="button">मतदाता पहचान पत्र के लिए आवेदन करें</a>
              <a class="givevote" href="/givevote" role="button">मत दें</a>
          </div>
      </div>
  </div>
  <div class="page3">
      <div class="policy">
          <div class="contact">
              <h3>हमसे संपर्क करें</h3>
              <button>टोल फ्री: 1947</button><br>
              <button>help@eci.gov.in</button>
          </div>
          <h2>भारत सरकार</h2>
          <a href="https://www.india.gov.in/">भारतीय राष्ट्रीय पोर्टल</a><br>
          <a href="https://www.mygov.in/">मेरा सरकार</a><br>
          <a href="https://digitalindia.gov.in/">डिजिटल इंडिया</a><br>
          <a href="https://www.gst.gov.in/">GST.gov.in</a><br>
          <a href="https://dbtbharat.gov.in/">डीबीटी भारत</a>
          <div class="footer">
              <h3>हमें फॉलो करें:</h3>
              <div class="social_media">
                  <ul>
                      <a href="#"><i class="fa-brands fa-facebook"></i></a>
                      <a href="#"><i class="fa-brands fa-twitter"></i></a>
                      <a href="#"><i class="fa-brands fa-instagram"></i></a>
                      <a href="#"><i class="fa-brands fa-youtube"></i></a>
                  </ul>
              </div>
              <h3>सहयोग के लिए, हमें ईमेल करें:</h3>
              <h5>anshikatiwari027@gmail.com</h5>
              <h5>rupsy1234@gmail.com</h5>
              <h5>mohitaman4321@gmail.com</h5>
              <p>© कॉपीराइट 2023 : अस्वीकृति: सिटिजन-चॉइस में प्रदान की गई सभी जानकारी एनएसडीएल द्वारा मानी और विश्वसनीय माना जाता है।</p>
          </div>
      </div>
  </div>
  
      `;
    }
  }
  