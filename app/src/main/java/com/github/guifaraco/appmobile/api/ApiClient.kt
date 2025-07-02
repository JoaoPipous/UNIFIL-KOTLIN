package com.github.guifaraco.appmobile.api

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiClient {
    private const val BASE_URL = "https://kotlin-api-yv25.onrender.com/"
N
    // Instancia o Retrofit configurado com a URL base e o conversor JSO
    val instance: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
}
