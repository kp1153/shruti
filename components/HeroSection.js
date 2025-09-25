import React from "react";
import {
  FaHeart,
  FaHandsHelping,
  FaBalanceScale,
  FaGraduationCap,
} from "react-icons/fa";

const ShrutiNagvanshiCard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 border-b-4 border-indigo-500 pb-3 mb-8">
          काशी की बेटी: श्रुति नागवंशी
        </h1>

        {/* Header/Summary Card */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-10 border-t-8 border-yellow-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <FaHandsHelping className="text-yellow-500 mr-3" />
            मानवाधिकार कार्यकर्ता और संस्थापिका
          </h2>
          <p className="text-gray-600 leading-relaxed">
            श्रुति नागवंशी **सविता बाई फुले महिला मंच** की संस्थापक और **जन
            मित्र न्यास** की प्रबंध न्यासी हैं, जो **PVCHR** (पीवीसीएचआर) के
            शासी बोर्ड का प्रतिनिधित्व करती हैं। उनका जीवन सामाजिक विसंगतियों,
            शोषण और वंचितों को न्याय दिलाने के लिए समर्पित है।
          </p>
        </div>

        {/* Grid Layout for Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Personal Background */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <FaGraduationCap className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              व्यक्तिगत और शैक्षिक यात्रा
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>जन्म: **2 जनवरी 1974**, वाराणसी।</li>
              <li>
                शिक्षा: बसंत कन्या विद्यालय (इंटरमीडिएट), उदय प्रताप कॉलेज
                (स्नातक)।
              </li>
              <li>
                व्यक्तिगत संघर्ष: पिता के विरोध के बावजूद गरीबों को भोजन दिया।
                ससुराल द्वारा निष्कासन के बाद भी पढ़ाई जारी रखी।
              </li>
              <li>
                पारिवारिक न्याय: बहन अनुपम के लिए पैतृक संपत्ति अधिकार हेतु अपने
                भाई के खिलाफ कानूनी कार्रवाई की।
              </li>
            </ul>
          </div>

          {/* Card 2: Organisational Roles */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <FaHeart className="text-4xl text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              संस्थापक भूमिकाएँ और आंदोलन
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                **PVCHR (1996):** सह-संस्थापक। उच्च जातियों में जन्म लेने के
                बावजूद सभी के अधिकारों के लिए संघर्ष।
              </li>
              <li>**जन मित्र न्यास (1999):** संस्थापक/प्रबंध न्यासी।</li>
              <li>
                **सविता बाई फुले महिला मंच:** महिलाओं के मानवाधिकार उल्लंघन के
                मामलों को उठाने के लिए स्थापित।
              </li>
              <li>
                **जन मित्र गाँव:** दलित समुदायों को UDHR 1948 के आधार पर सशक्त
                बनाना।
              </li>
              <li>**बचपन बचाओ आंदोलन:** 1996-97 में जिला महासचिव।</li>
            </ul>
          </div>

          {/* Card 3: Legal/Social Impact */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 lg:col-span-1 md:col-span-2">
            <FaBalanceScale className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              न्याय और हस्तक्षेप के प्रमुख मामले
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                **कुल प्रभाव:** 11 वर्षों में लगभग 3500 मामले उठाए, जिनमें से
                लगभग **200 में सकारात्मक परिणाम** प्राप्त हुए।
              </p>

              <h4 className="font-bold text-md text-gray-800">
                शीला देवी मामला (2003):
              </h4>
              <p className="text-sm text-gray-600">
                अस्पताल की लापरवाही से मृत्यु पर NHRC को रिपोर्ट भेजी। डॉक्टरों
                और नर्सों पर कार्रवाई हुई और उपभोक्ता अदालत में मुआवजे का केस
                दायर किया गया।
              </p>

              <h4 className="font-bold text-md text-gray-800">
                बागवानाला केस (2002):
              </h4>
              <p className="text-sm text-gray-600">
                स्थानीय पुलिस द्वारा समर्थित **कैसीनो** को सामुदायिक बैठकों से
                बंद कराया। सांप्रदायिक दंगा भड़काने की पुलिस की कोशिश को विफल
                किया, जिसके बाद SSP के निर्देश पर पुलिस ने माफी मांगी।
              </p>

              <h4 className="font-bold text-md text-gray-800">
                मुसहर बच्चों का शारीरिक दंड:
              </h4>
              <p className="text-sm text-gray-600">
                लेख 'जनसत्ता' में प्रकाशित हुआ, जिसे **यूपी उच्च न्यायालय ने
                स्वत: संज्ञान याचिका** के रूप में लिया, जिससे दलित बच्चों को
                न्याय मिला।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShrutiNagvanshiCard;
