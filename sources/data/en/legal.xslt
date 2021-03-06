<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <header>
      <h1 output="{{{{Messages['legal.text']}}}}"></h1>
    </header>
    <article> 
      <xsl:value-of select="/legal/terms"/>
    </article>
    <header>
      <h1 output="{{{{Messages['legal.about.title']}}}}"></h1>
    </header>
    <article> 
      <xsl:value-of select="/legal/about"/>
    </article>
  </xsl:template>
</xsl:stylesheet>