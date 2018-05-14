<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <xsl:for-each select="news/entry[position() &lt;= 5]">
      <xsl:sort select="date" order="descending"/>
      <div>
        <div>
          <xsl:variable name="month-no" select="substring(date, 6, 2)"/>
          <xsl:variable name="month">
            <xsl:choose>
              <xsl:when test="$month-no = '01'">Januar</xsl:when>
              <xsl:when test="$month-no = '02'">Februar</xsl:when>
              <xsl:when test="$month-no = '03'">M&#228;rz</xsl:when>
              <xsl:when test="$month-no = '04'">April</xsl:when>
              <xsl:when test="$month-no = '05'">Mai</xsl:when>
              <xsl:when test="$month-no = '06'">Juni</xsl:when>
              <xsl:when test="$month-no = '07'">Juli</xsl:when>
              <xsl:when test="$month-no = '08'">August</xsl:when>
              <xsl:when test="$month-no = '09'">September</xsl:when>
              <xsl:when test="$month-no = '10'">Oktober</xsl:when>
              <xsl:when test="$month-no = '11'">November</xsl:when>
              <xsl:when test="$month-no = '12'">Dezember</xsl:when>
            </xsl:choose>           
          </xsl:variable>
          <div>
            <xsl:value-of select="substring(date, 9, 2)"/>
          </div>
          <div>
            <xsl:value-of select="$month"/>
          </div>
          <div>
            <xsl:value-of select="substring(date, 1, 4)"/>
          </div>
        </div>
        <div>
          <h1 escaping="on">
            <xsl:value-of select="title"/>
          </h1>
          <p escaping="{text/@escaping}">
            <xsl:value-of select="text"/>
          </p>
        </div>
      </div>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>