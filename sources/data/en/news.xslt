<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html"/>
  <xsl:template match="atom:feed">
    <header>
      <h1>{{Messages['news.title']}}</h1>
    </header>
    <article>
      <xsl:for-each select="atom:entry[position() &lt;= 5]">
        <xsl:sort select="atom:updated" order="descending"/>
        <div>
          <div>
            <div>
              <xsl:value-of select="substring(atom:updated, 9, 2)"/>
            </div>
          </div>
          <div>
            <div>
              {{Messages['calendar.month.<xsl:value-of select="substring(atom:updated, 6, 2)"/>.title']}}
            </div>
            <div>
              <xsl:value-of select="substring(atom:updated, 1, 4)"/>
            </div>
          </div>
          <div>
            <h2 escape="on">
              <xsl:value-of select="atom:title"/>
            </h2>
            <p escape="on">
              <xsl:value-of select="atom:summary"/>
            </p>
          </div>
        </div>
      </xsl:for-each>
    </article>
  </xsl:template>
</xsl:stylesheet>