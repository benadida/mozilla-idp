/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function () {
window.provision = function (user) {
  var cmpi = function (s1, s2) {
        if (! s1.toLowerCase) s1 = String(s1);
        if (! s2.toLowerCase) s2 = String(s2);
        return s1.toLowerCase() == s2.toLowerCase();
      },
      msg = "user is not authenticated as target user";

  // username@dev.clortho.mozilla.org
  navigator.id.beginProvisioning(function(email, cert_duration) {
    if (! user) {
      navigator.id.raiseProvisioningFailure(msg);
    } else {
      if (cmpi(user, email)) {
      alert('wsapi_url=' + $('[name=wsapi_url]').val());
      navigator.id.genKeyPair(function(pubkey) {
        $.ajax({
            url: "_csrf": $('[name=wsapi_url]').val(),
            data: JSON.stringify({
              pubkey: pubkey,
              duration: cert_duration,
              "_csrf": $('[name=_csrf]').val()
            }),
            type: 'POST',
            headers: { "Content-Type": 'application/json' },
            dataType: 'json',
            success: function(r) {
              navigator.id.registerCertificate(r.cert);
            },
            error: function(r) {
              navigator.id.raiseProvisioningFailure(msg);
            }
          });
        });
      } else {
        navigator.id.raiseProvisioningFailure(msg);
      }
    }
  }); //beginProvisioning
};
})();