package nl.mikis13.robots
import android.app.Activity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
class MainActivity:Activity(){override fun onCreate(b:Bundle?){super.onCreate(b);val w=WebView(this);setContentView(w);w.settings.javaScriptEnabled=true;w.settings.domStorageEnabled=true;w.webViewClient=WebViewClient();w.loadUrl("http://127.0.0.1:4700")}}
